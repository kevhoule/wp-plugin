import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const updatePostOrder = (orderToUpdate, toggleLoading) => {
  toggleLoading(true);
  let count = 0;

  orderToUpdate.forEach(async ({ id, menu_order }) => {
    await apiFetch({
      path: `/wp/v2/mega-menu-item/${id}`,
      method: 'POST',
      data: { menu_order }
    }).then(res => {
      console.log('post modified: ', res);
    }).finally(() => {
      count += 1;

      if (orderToUpdate.length === count) {
        toggleLoading(false);
      }
    })
  });
};

export default updatePostOrder;