import { __ } from '@wordpress/i18n';
import { URLInput } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { withState } from '@wordpress/compose';
import { select } from '@wordpress/data';
import { TextControl } from '@wordpress/components';

const CreateMenuItem = withState({
  url: '',
  title: '',
})
  (({ url, title, toggleLoading, isLoading, setState, posts }) => {

    const createMenuItem = async (title, url) => {
      const parent = select('core/editor').getCurrentPostId();

      const meta = {
        item_has_url: url == null ? false : true,
        item_link_url: url,
        item_has_title: true,
      }

      const menu_order = posts.length;

      const content = `
          <!-- wp:okam/mega-menu {"itemLinkUrl":"${url}"} /-->
        `;

      toggleLoading(true);

      await apiFetch({
        path: '/wp/v2/mega-menu-item',
        method: 'POST',
        data: { title, parent, meta, status: 'publish', content, menu_order }
      }).then(res => {
        console.log('post created: ', res);
      });

      toggleLoading(false);
    }

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        createMenuItem(title, url);
      }}>
        <TextControl
          label="Menu Item Title"
          onChange={(title) => setState({ title })}
          value={title}
        />

        <URLInput
          label="Menu Item Url"
          value={url}
          onChange={(url, post) => {
            setState({ url });

            if (post != null) {
              const title = post.title;
              setState({ title });
            }
          }}
        />

        <button disabled={isLoading === true} type="submit">Create new menu item</button>
      </form>
    )
  });

export default CreateMenuItem;
