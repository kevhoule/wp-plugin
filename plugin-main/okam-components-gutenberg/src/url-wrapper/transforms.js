
import { 
  createBlock,
  createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

const transforms = {
  from: [
    {
      type: 'block',
			isMultiBlock: true,
			blocks: [ '*' ],
			__experimentalConvert: ( blocks ) => {
        const innerBlocksTemplate = blocks.map(({ name, attributes, innerBlocks }) => {
            return [
              name,
              { ...attributes },
              innerBlocks
            ];
          }
        );
        return createBlock(
					'okam/url-wrapper',
					{},
					createBlocksFromInnerBlocksTemplate( innerBlocksTemplate )
				);
      }
    }
  ],
};

export default transforms;