
/**
 * WordPress dependencies
 */
import { 
  InnerBlocks,
  useBlockProps,
} from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const {
		linkTarget,
		rel,
		url,
	} = attributes;
	const baseClass = 'wp-block-okam-url-wrapper';

	return (
		<div { ...useBlockProps.save( { className: `wp-block ${className || ''}` } ) }>
      <a className={ `${baseClass}__link` } href={ url } target={ linkTarget } rel={ rel }>
        <div className={ `${baseClass}__inner-container` }>
          <InnerBlocks.Content />
        </div>
      </a>
		</div>
	);
}