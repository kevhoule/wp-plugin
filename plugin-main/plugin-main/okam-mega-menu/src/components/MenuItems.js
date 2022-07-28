import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import MenuItemsList from './MenuItemsList';
import CreateMenuItem from './CreateMenuItem';
import { select } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

const MenuItems = ({ toggleLoading, isLoading }) => {
    const [data, updateData] = useState();
    const postId = select('core/editor').getCurrentPostId();
  
    useEffect(() => {
      const getData = async () => {
        const data = await apiFetch({ path: `/wp/v2/mega-menu-item?parent=${postId}` });
        updateData(data);
      }
      getData();
    }, []);
    return (
      <>
        <div>
          <h5>Menu Link (only direct child are currently displayed)</h5>
          {isLoading
            ? <div>Loading...</div>
            : data
              ? <MenuItemsList posts={data} toggleLoading={toggleLoading} />
              : <div>Loading...</div>
          }
        </div>
  
        <div>
          <h5>Add new menu item</h5>
          <CreateMenuItem isLoading={isLoading} posts={data} toggleLoading={toggleLoading} />
        </div>
      </>
    )
  }

export default MenuItems;
