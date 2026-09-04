import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"","url":"","children":[{"displayName":"welcome","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/welcome"},{"displayName":"welcome","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/welcome"},{"displayName":"welcome","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/welcome"}]},{"displayName":"","url":"","children":[{"displayName":"getting_started","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/getting-started"},{"displayName":"","url":"","children":[{"displayName":"introduction","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/introduction"},{"displayName":"introduction","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/introduction"},{"displayName":"introduction","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/introduction"},{"displayName":"introduction","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/introduction"}]},{"displayName":"","url":"","children":[{"displayName":"installation","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/installation"},{"displayName":"installation","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/installation"},{"displayName":"installation","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/installation"},{"displayName":"installation","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/installation"},{"displayName":"installation","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/installation"},{"displayName":"installation","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/installation"}]},{"displayName":"","url":"","children":[{"displayName":"quick_start","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/quick-start"},{"displayName":"quick_start","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/quick-start"},{"displayName":"quick_start","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/quick-start"},{"displayName":"quick_start","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/quick-start"}]}]},{"displayName":"","url":"","children":[{"displayName":"ide_function","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/ide-function"},{"displayName":"","url":"","children":[{"displayName":"project_management","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/project-management"},{"displayName":"upgrade_project","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/upgrade-project"},{"displayName":"Export_project","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/export-project"},{"displayName":"export_application_template","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/export-application-template"}]},{"displayName":"","url":"","children":[{"displayName":"project_build_and_deploy","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/project-build-and-deploy"},{"displayName":"project_build_and_deploy","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/project-build-and-deploy"}]},{"displayName":"resource_management","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/resource-management"},{"displayName":"","url":"","children":[{"displayName":"system_setting","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/system-setting"},{"displayName":"system_setting","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/system-setting"}]},{"displayName":"","url":"","children":[{"displayName":"keyb_menu_function","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/keyb-menu-function"},{"displayName":"keyb_menu_function","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/keyb-menu-function"},{"displayName":"keyb_menu_function","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/keyb-menu-function"}]},{"displayName":"shortcut_function_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/shortcut-function-0"}]},{"displayName":"","url":"","children":[{"displayName":"widget_details","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/widget-details"},{"displayName":"","url":"","children":[{"displayName":"attribute","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/attribute"},{"displayName":"screen","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/screen"},{"displayName":"button_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/button-0"},{"displayName":"image_button_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/image-button-0"},{"displayName":"checkbox_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/checkbox-0"},{"displayName":"button_matrix_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/button-matrix-0"},{"displayName":"switch_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/switch-0"},{"displayName":"label_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/label-0"},{"displayName":"span_group","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/span-group"},{"displayName":"drop_down","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/drop-down"},{"displayName":"text_area_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/text-area-0"},{"displayName":"calender","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/calender"},{"displayName":"table_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/table-0"},{"displayName":"tab_view_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/tab-view-0"},{"displayName":"message_box_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/message-box-0"},{"displayName":"container_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/container-0"},{"displayName":"chart_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/chart-0"},{"displayName":"canvas_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/canvas-0"},{"displayName":"list_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/list-0"},{"displayName":"window_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/window-0"},{"displayName":"tile_view","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/tile-view"},{"displayName":"menu_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/menu-0"},{"displayName":"arc_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/arc-0"},{"displayName":"line_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/line-0"},{"displayName":"roller_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/roller-0"},{"displayName":"led_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/led-0"},{"displayName":"color","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/color"},{"displayName":"spinner_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/spinner-0"},{"displayName":"spin_box","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/spin-box"},{"displayName":"meter_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/meter-0"},{"displayName":"image_1","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/image-1"},{"displayName":"animation_image_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/animation-image-0"},{"displayName":"3d_image","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/3d-image"},{"displayName":"bar_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/bar-0"},{"displayName":"slider_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/slider-0"}]},{"displayName":"","url":"","children":[{"displayName":"advance_widget","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/advance-widget"},{"displayName":"lottie_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/lottie-0"},{"displayName":"qr_code_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qr-code-0"},{"displayName":"bar_code","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/bar-code"},{"displayName":"analog_clock_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/analog-clock-0"},{"displayName":"carousel_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/carousel-0"},{"displayName":"video_2","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/video-2"},{"displayName":"digital_clock_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/digital-clock-0"},{"displayName":"text_progress_bar","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/text-progress-bar"},{"displayName":"radio_button_0","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/radio-button-0"},{"displayName":"chinese_input_keyboard","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/chinese-input-keyboard"},{"displayName":"date_text","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/date-text"}]},{"displayName":"","url":"","children":[{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"","url":"","children":[{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"},{"displayName":"style","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/style"}]}]},{"displayName":"","url":"","children":[{"displayName":"event","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/event"},{"displayName":"event","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/event"},{"displayName":"event","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/event"},{"displayName":"event","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/event"},{"displayName":"event","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/event"}]}]},{"displayName":"","url":"","children":[{"displayName":"development","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/development"},{"displayName":"","url":"","children":[{"displayName":"debug_project","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/debug-project"},{"displayName":"","url":"","children":[{"displayName":"debug_project","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/debug-project"},{"displayName":"debug_project","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/debug-project"},{"displayName":"debug_project","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/debug-project"},{"displayName":"debug_project","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/debug-project"}]}]},{"displayName":"","url":"","children":[{"displayName":"hardware_acceleration","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/hardware-acceleration"},{"displayName":"hardware_acceleration","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/hardware-acceleration"},{"displayName":"hardware_acceleration","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/hardware-acceleration"},{"displayName":"","url":"","children":[{"displayName":"hardware_acceleration","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/hardware-acceleration"},{"displayName":"hardware_acceleration","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/hardware-acceleration"},{"displayName":"hardware_acceleration","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/hardware-acceleration"}]}]},{"displayName":"","url":"","children":[{"displayName":"performance","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/performance"},{"displayName":"performance","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/performance"},{"displayName":"performance","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/performance"},{"displayName":"","url":"","children":[{"displayName":"performance","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/performance"},{"displayName":"performance","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/performance"},{"displayName":"performance","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/performance"}]}]},{"displayName":"","url":"","children":[{"displayName":"external_storage","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/external-storage"},{"displayName":"","url":"","children":[{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"","url":"","children":[{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"}]},{"displayName":"","url":"","children":[{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"},{"displayName":"sd_card","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/sd-card"}]}]},{"displayName":"","url":"","children":[{"displayName":"qspi_flash","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qspi-flash"},{"displayName":"qspi_flash","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qspi-flash"},{"displayName":"qspi_flash","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qspi-flash"}]}]},{"displayName":"","url":"","children":[{"displayName":"porting_rtos","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/porting-rtos"},{"displayName":"","url":"","children":[{"displayName":"zephyr","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/zephyr"},{"displayName":"zephyr","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/zephyr"},{"displayName":"zephyr","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/zephyr"},{"displayName":"zephyr","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/zephyr"},{"displayName":"zephyr","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/zephyr"},{"displayName":"zephyr","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/zephyr"}]},{"displayName":"","url":"","children":[{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"},{"displayName":"frequently_asked_questions_faqs","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/frequently-asked-questions-faqs"}]},{"displayName":"","url":"","children":[{"displayName":"yocto","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/yocto"},{"displayName":"yocto","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/yocto"},{"displayName":"yocto","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/yocto"},{"displayName":"yocto","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/yocto"},{"displayName":"yocto","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/yocto"}]},{"displayName":"","url":"","children":[{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"},{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"},{"displayName":"","url":"","children":[{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"},{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"}]},{"displayName":"","url":"","children":[{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"},{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"},{"displayName":"","url":"","children":[{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"},{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"},{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"}]}]},{"displayName":"qnx","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/qnx"}]}]},{"displayName":"","url":"","children":[{"displayName":"freemaster_debug_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/freemaster-debug-in-gui-guider"},{"displayName":"freemaster_debug_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/freemaster-debug-in-gui-guider"},{"displayName":"freemaster_debug_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/freemaster-debug-in-gui-guider"},{"displayName":"freemaster_debug_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/freemaster-debug-in-gui-guider"},{"displayName":"freemaster_debug_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/freemaster-debug-in-gui-guider"}]}]},{"displayName":"","url":"","children":[{"displayName":"tutoeials","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/tutoeials"},{"displayName":"interact_with_peripherials_by_custom_code","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/interact-with-peripherials-by-custom-code"},{"displayName":"add_custom_attributes_and_styles_after_setup_screen","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/add-custom-attributes-and-styles-after-setup-screen"},{"displayName":"reuse_gui_design_on_differenr_boards_and_panels","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/reuse-gui-design-on-differenr-boards-and-panels"},{"displayName":"rotate_screen_and_widgets","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/rotate-screen-and-widgets"},{"displayName":"design_multiple_page_application_by_titleview","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/design-multiple-page-application-by-titleview"},{"displayName":"custimize_variables_in_lv_conf_h","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/custimize-variables-in-lv-conf-h"},{"displayName":"","url":"","children":[{"displayName":"experience_with_micropython_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/experience-with-micropython-in-gui-guider"},{"displayName":"experience_with_micropython_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/experience-with-micropython-in-gui-guider"},{"displayName":"experience_with_micropython_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/experience-with-micropython-in-gui-guider"},{"displayName":"","url":"","children":[{"displayName":"experience_with_micropython_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/experience-with-micropython-in-gui-guider"},{"displayName":"experience_with_micropython_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/experience-with-micropython-in-gui-guider"},{"displayName":"experience_with_micropython_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/experience-with-micropython-in-gui-guider"}]},{"displayName":"experience_with_micropython_in_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/experience-with-micropython-in-gui-guider"}]},{"displayName":"upgrade_a_project_in_a_newer_gui_guider","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/upgrade-a-project-in-a-newer-gui-guider"},{"displayName":"how_to_set_the_gradient_color","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/how-to-set-the-gradient-color"},{"displayName":"how_to_develop_a_multi_language_application","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/how-to-develop-a-multi-language-application"}]},{"displayName":"","url":"","children":[{"displayName":"miscellaneous","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/miscellaneous"},{"displayName":"miscellaneous","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/miscellaneous"}]},{"displayName":"note_about_the_source_code_in_the_document","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/note-about-the-source-code-in-the-document"},{"displayName":"legal_information","url":"contents/ditamaps/ditamap11150359020374145070/pdfproject/dita/topics/legal-information"}]
const mapTitle = "GUIGUIDERUG_1.7.0"
const isDesktop = window.matchMedia("(min-width: 900px)");

function expandHeirarchy(element, root) {
  if (element === root) return;
  let parent = element.parentElement;
  parent.classList.remove("closed");
  expandHeirarchy(parent, root);
}

function expandSelection(parent) {
  let queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let id = params.get("expand");
  let element = document.getElementById(`sidenav-li-${id}`);
  if (!element) return;
  element.classList.add("selected");
  expandHeirarchy(element, parent);
  element.scrollIntoView();
}

function scrollSidenavSelectionToView() {
  const element = document.querySelector('.sidenav-list-item.selected')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  if(!element) return
  if (element.offsetTop < sidenavContainer.scrollTop || element.offsetTop + element.offsetHeight > sidenavContainer.scrollTop + sidenavContainer.clientHeight) {
    sidenavContainer.scrollTo({
      top: Math.max(element.offsetTop - 110, 0),
      behavior: 'smooth'
    });
  }
}



function addResizeBar() {
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  const div = document.createElement("div");
  div.classList.add('sidenav-resize-bar');
  let isResizing = false
  div.addEventListener('mousedown', (evt) => {
    isResizing = true
    document.addEventListener('mousemove', function (event) {
      if (isResizing) {
        let newWidth = event.pageX - sidenavContainer.offsetLeft;
        sidenavContainer.style.width = `${newWidth}px`;
      }
    })
  })
  document.addEventListener('mouseup', function () {
    if (isResizing) {
      isResizing = false;
    }
  })
  sidenavContainer.insertAdjacentElement("afterend", div)
}

function addExpandCollapseButton() {
  const divWrapper = document.createElement("div");
  divWrapper.classList.add('title-close-wrapper')
  const titleSpan = document.createElement("span");
  titleSpan.classList.add('title-span')
  titleSpan.textContent = mapTitle
  const span = document.createElement("span");
  span.classList.add('sidenav-expand-collapse')
  span.classList.add('open')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  span.addEventListener('click', () => {
    const isOpen = span.classList.contains('open')
    const sidenavResizer = document.getElementsByClassName("sidenav-resize-bar")[0];
    if(!isOpen) {
      sidenavContainer.classList.remove('collapse-width')
      sidenavResizer.classList.remove('force-hide')
    } else {
      sidenavContainer.classList.add('collapse-width')
      sidenavResizer.classList.add('force-hide')
    }
    span.classList.toggle("open");
  })
  divWrapper.append(titleSpan)
  divWrapper.append(span)
  sidenavContainer.prepend(divWrapper)
}

function generateId(prefix, suffix) {
  if(prefix) {
      return `${prefix}-${suffix}`
  }
  return `${suffix}`
}


window.addEventListener('aem-app-ready', () => {
  scrollSidenavSelectionToView()
})


function createTree(parent, data, prefix, level) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");
  parent.appendChild(ul);
  data.forEach((item, idx) => {
    const li = document.createElement("li");
    const newPrefix = generateId(prefix, level)
    const _id = generateId(newPrefix, idx);
    li.setAttribute("id", `sidenav-li-${_id}`);
    ul.appendChild(li);
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    span.classList.add("chevron-icon-span");
    anchor.textContent = item.displayName;
    anchor.setAttribute("data-li-id", _id);
    anchor.setAttribute("title", item.displayName);
    anchor.setAttribute("aria-label", item.displayName);
    const siteURL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
    if (item.url) {
      let navURL = new URL(item.url, siteURL).href;
      anchor.setAttribute("href", navURL);
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        onClick(anchor.getAttribute("data-li-id"), navURL);
      });
    }
    li.classList.add("sidenav-list-item");
    li.classList.add("closed");
    if (item.children) {
      li.classList.add("has-children");
      const wrapperSpan = document.createElement("span");
      wrapperSpan.classList.add("chevron-text-wrapper");
      wrapperSpan.appendChild(span);
      wrapperSpan.appendChild(anchor);
      li.appendChild(wrapperSpan);
      createTree(li, item.children, newPrefix, idx);
    } else {
      li.appendChild(anchor);
    }
  });
}

function onClick(id, navURL) {
  const url = new URL(navURL);
  url.searchParams.set("expand", id); // set the query parameter
  window.location.href = url.toString(); // navigate
}

// Get the treeview element and create the tree
const treeview = document.getElementsByClassName("sidenav")[0];
addExpandCollapseButton();
createTree(treeview, treeData, '', '');
migrateTree(isDesktop);
addResizeBar(treeview);
isDesktop.addEventListener("change", () => migrateTree(isDesktop));
expandSelection(treeview);

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});