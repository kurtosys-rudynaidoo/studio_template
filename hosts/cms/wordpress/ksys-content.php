<?php
/**
 * Plugin Name: Kurtosys Content
 * Description: Same-origin route for published Kurtosys Content Manager items. WordPress looks up the content type and instance by name, then returns HTML. The API token stays in wp-config.php.
 *
 * Install as a must-use plugin (wp-content/mu-plugins/ksys-content.php) and define:
 *   define('KSYS_CONTENT_TOKEN', '...');
 *   define('KSYS_CONTENT_API', 'https://api-us.kurtosys.app/content'); // optional; UK clients use https://api-uk.kurtosys.app/content
 *
 * Route:
 *   GET /wp-json/ksys/v1/content/{type}/{name}?culture=en-US
 *
 * A new item does not need a plugin change. Publish it in Content Manager, then request it by
 * content type name and instance name. Responses cache for 15 minutes.
 */

if (!defined('ABSPATH')) {
	exit;
}

add_action('rest_api_init', function () {
	register_rest_route(
		'ksys/v1',
		'/content/(?P<type>[^/]+)/(?P<name>[^/]+)',
		array(
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => 'ksys_content_resolve',
		)
	);
});

/**
 * @param WP_REST_Request $request
 * @return WP_REST_Response|WP_Error
 */
function ksys_content_resolve($request) {
	$type = ksys_content_label($request->get_param('type'));
	$name = ksys_content_label($request->get_param('name'));
	if ($type === '' || $name === '') {
		return new WP_Error('ksys_unknown_content', 'Unknown content type or name.', array('status' => 404));
	}
	if (!defined('KSYS_CONTENT_TOKEN') || KSYS_CONTENT_TOKEN === '') {
		return new WP_Error('ksys_content_token_missing', 'Content token is not configured.', array('status' => 500));
	}

	$culture = (string) $request->get_param('culture');
	if ($culture === '') {
		$culture = 'en-US';
	}

	$cache_key = 'ksys_content_' . md5($type . '|' . $name . '|' . $culture);
	$cached = get_transient($cache_key);
	if (is_string($cached) && $cached !== '') {
		return new WP_REST_Response(array('html' => $cached), 200);
	}

	$api = ksys_content_api_base();
	$type_id = ksys_content_find_id(
		$api . '/content-types',
		array(
			'search' => $type,
			'isActive' => 'true',
			'limit' => 100,
		),
		$type
	);
	if ($type_id === '') {
		return new WP_Error('ksys_unknown_content', 'Unknown content type.', array('status' => 404));
	}

	$instance_id = ksys_content_find_id(
		$api . '/content-instances',
		array(
			'contentTypeId' => $type_id,
			'search' => $name,
			'isActive' => 'true',
			'limit' => 100,
		),
		$name
	);
	if ($instance_id === '') {
		return new WP_Error('ksys_unknown_content', 'Unknown content name.', array('status' => 404));
	}

	$response = wp_remote_post(
		$api . '/content-resolution/resolve',
		array(
			'timeout' => 20,
			'headers' => array(
				'Content-Type' => 'application/json',
				'X-KSYS-TOKEN' => KSYS_CONTENT_TOKEN,
			),
			'body' => wp_json_encode(
				array(
					'contentTypeId' => $type_id,
					'contentInstanceId' => $instance_id,
					'cultures' => array($culture),
					'renderFormat' => 'html',
					'context' => array('tags' => new stdClass()),
				)
			),
		)
	);

	if (is_wp_error($response)) {
		return new WP_Error('ksys_content_request_failed', 'Content request failed.', array('status' => 502));
	}

	$status = (int) wp_remote_retrieve_response_code($response);
	$payload = json_decode((string) wp_remote_retrieve_body($response), true);
	$html = '';
	if (is_array($payload) && isset($payload['content']) && is_array($payload['content'])) {
		$value = $payload['content'][$culture] ?? '';
		if (is_string($value)) {
			$html = trim($value);
		}
	}
	if ($status < 200 || $status >= 300 || $html === '') {
		return new WP_Error('ksys_content_empty', 'Published content was not returned.', array('status' => 502));
	}

	set_transient($cache_key, $html, 15 * MINUTE_IN_SECONDS);
	return new WP_REST_Response(array('html' => $html), 200);
}

function ksys_content_api_base() {
	if (defined('KSYS_CONTENT_API') && is_string(KSYS_CONTENT_API) && KSYS_CONTENT_API !== '') {
		return rtrim(KSYS_CONTENT_API, '/');
	}
	return 'https://api-us.kurtosys.app/content';
}

/**
 * @param mixed $value
 */
function ksys_content_label($value) {
	$label = trim(rawurldecode((string) $value));
	if ($label === '' || strlen($label) > 200) {
		return '';
	}
	if (!preg_match('/^[A-Za-z0-9][A-Za-z0-9 ._-]*$/', $label)) {
		return '';
	}
	return $label;
}

/**
 * @param array<string, string> $query
 */
function ksys_content_find_id($url, $query, $name) {
	$response = wp_remote_get(
		add_query_arg($query, $url),
		array(
			'timeout' => 20,
			'headers' => array(
				'Accept' => 'application/json',
				'X-KSYS-TOKEN' => KSYS_CONTENT_TOKEN,
			),
		)
	);
	if (is_wp_error($response)) {
		return '';
	}
	$payload = json_decode((string) wp_remote_retrieve_body($response), true);
	$rows = is_array($payload) && isset($payload['data']) && is_array($payload['data']) ? $payload['data'] : array();
	foreach ($rows as $row) {
		if (!is_array($row) || !isset($row['name'], $row['id'])) {
			continue;
		}
		if ($row['name'] === $name && (!array_key_exists('isActive', $row) || $row['isActive'])) {
			return (string) $row['id'];
		}
	}
	return '';
}
