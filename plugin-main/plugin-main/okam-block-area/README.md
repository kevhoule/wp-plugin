# Block Area

Block area are used to add predefinite gutenberg zone on a given page or template. They are used to inject reusable content or to add content to a page without an existing gutenberg output.

# Usage

1- Create a new post under the post type 'Block Area'
2- Define a page name; the page slug will be used to fetch the post data.
3- For example, to define a footer area, create a post with slug 'footer'
4- In your code, call and output `BlockArea::getBlockContent('footer')` in your footer area
5- You will now be able to see the gutenberg output

# GraphQL

You can query `blockArea` by slug to retrieve the content like you would do to any post type.

# Programmatical use

It's also possible to use this function programmatically, for example, let's say we want to define a block area on a woocommerce template archive page:

```php
    if( class_exists('BlockArea')) {
        $name = 'before-category-' . sanitize_title(woocommerce_page_title(false));
        echo BlockArea::getBlockContent($name)
    }
```

Let's say the woocommerce page title is "product". You can then create a block area with slug `before-category-product` to output a gutenberg block where the code is called.

# Best practices

1- Since this is a plugin, check if class exists before calling it, in case the plugins get deactivated, this will prevent a crash or an error code 500.

2- Don't pass user input as variable to fetch post name, this could be a security issue. Ask someone else before doing something like this.

3- Establish a pattern for outputtted content, for example wrapping the function call inside a div with class name to make it easier to find on a page.

```
<div class="block-area block-area-' . $location . '">';
    @php
        BlockArea::getBlockContent($name)
    @endphp
</div>
```

# Install

This plugin should be installed through composer.