<php if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
	'key' => 'group_5c40e1495d518',
	'title' => 'Projects Page Carousel',
	'fields' => array(
		array(
			'key' => 'field_5c40e1db0e0a5',
			'label' => 'enable projects carousel',
			'name' => 'enable_projects_carousel',
			'type' => 'true_false',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'message' => '',
			'default_value' => 0,
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
		),
		array(
			'key' => 'field_5c40e21d0e0a7',
			'label' => 'Projects Carousel Number of projects',
			'name' => 'projects_carousel_number_of_projects',
			'type' => 'number',
			'instructions' => 'You can pick between 3, 6, or 12... etc (every multiple of 3)
number of projects.',
			'required' => 0,
			'conditional_logic' => array(
				array(
					array(
						'field' => 'field_5c40e1db0e0a5',
						'operator' => '==',
						'value' => '1',
					),
				),
			),
			'wrapper' => array(
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => 9,
			'placeholder' => '',
			'prepend' => '',
			'append' => '',
			'min' => 0,
			'max' => 30,
			'step' => 3,
		),
	),
	'location' => array(
		array(
			array(
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'post',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif; ?>