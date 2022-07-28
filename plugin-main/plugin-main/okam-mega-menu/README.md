# Okam Menu (WP plugin)

## Rational
Default wordpress menu are limited in scope. With modern design and needs, the current menu feature of wordpress is a bit lackluster. By default, a user cannot add images, icons next to link or add a descriptive text.

A mega menu WordPress plugin to allow multi level menu with sub items. Each items can contains a link or free form contents from Gutenberg.

## How it works
The menu is actually a list of wp post inside of a custom post type. The ordering is done through the menu-order properties, which exists on Post type.
The top level item are considered "Menu definition" and each of its children are menu items.

## Menu Item Options
Menu item have multiple option to help you create the menu you want.

### Item has title
If checked, this menu item will output a title. Default to true, disable if you want to display a description or an image only.

### Item has url
If checked, the item will output an url `<a>` tag. Default to true, disable if you want a purely informational item.

### Item has extra content
If checked, this will allow you to add custom gutenberg content inside of the item. Useful if you want to add a descriptive text, an image, etc. Default to false.

### Icon
Icon are not yet supported. Waiting on confirmation for an icon component.

## Usage

Make sure you are using the latest version of Okam Components (at least 1.9.1), since this plugin works with `<okam-navigation>`

First, you need to create your menu. The top level post is your menu definition. Each post child is a menu item. By default, only the 2nd level post is visible on the front end. The 3rd level is a submenu and is visible on click.

### Basic
To display the menu on the frontend, call
`$menu = apply_filters('okam_mega_menu', '', 'main', []);` where the third param is the slug name of the top level item.

### Shortcode
Add `[okam_mega_menu menu="main"]` replace "main' with your menu slug name (top level item).

### Settings
You can also pass settings to the menu comp to modify `<okam-navigation>` props.
Available settings:

- allow_multiple_sub_menu_open
- burger_mode_breakpoint
- menu_id
- toggle_menu_text
- class_name
- use_popover

See https://okam-storybook.netlify.app/?path=/docs/web-components-okam-navigation--horizontal-scroll for a complete description of each prop.

(property name are converted to snake_case)

To use, pass an array as the fourth parameter in the apply_filters
`$menu = apply_filters('okam_mega_menu', '', 'main', ['menu_id' => 'my_menu']);` where the third param is the slug name of the top level item.

Or with shortcode  `[okam_mega_menu menu="main" menu_id="my_menu"]`

## Development

Run `npm install` and `npm run start`.