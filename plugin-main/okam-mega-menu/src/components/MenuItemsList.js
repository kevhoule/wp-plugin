import { __ } from '@wordpress/i18n';
import { withState } from '@wordpress/compose';
import updatePostOrder from './updatePostOrder';

const MenuItemsList = withState(({ orderToUpdate: [] }))
  (({ posts, toggleLoading, orderToUpdate, setState }) => {
    return (
      <>
        <ul className="menu-item-list">
          {posts
            .sort((a, b) => parseFloat(a.menu_order) - parseFloat(b.menu_order))
            .map(({ id, title, menu_order }) => (
              <li className="menu-item-list__item" key={id}>
                <div>{title.rendered}</div>
                <div>
                  <span>Menu order: {menu_order}</span>
                  <input
                    id="menu_order"
                    type="number"
                    onChange={({ target }) => {
                      setState({ orderToUpdate: [...orderToUpdate, { id, menu_order: target.value }] });
                    }}
                  />
                </div>
                <div><a href={`${window.location.pathname}?post=${id}&action=edit`}>Edit menu item</a></div>
              </li>
            ))}
        </ul>

        {orderToUpdate.length > 0 &&
          <button onClick={() => updatePostOrder(orderToUpdate, toggleLoading)}>
            Update Menu Item Order
          </button>
        }
      </>

    )
  });

export default MenuItemsList;