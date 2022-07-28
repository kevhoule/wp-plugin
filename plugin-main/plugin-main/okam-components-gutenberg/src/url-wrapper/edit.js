/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { 
  InnerBlocks, 
	useBlockProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import { 
	useCallback, 
  useRef,
} from '@wordpress/element';

import {
	Button,
	PanelBody,
	TextControl,
	Popover,
} from '@wordpress/components';


const NEW_TAB_REL = 'noreferrer noopener';

function URLPicker( {
	isSelected,
	url,
	rel,
	setAttributes,
	opensInNewTab,
	onToggleOpenInNewTab,
	anchorRef,
} ) {
	const urlIsSet = !! url;

	const unlinkButton = () => {
		setAttributes( {
			url: '',
			linkTarget: false,
			rel: '',
		} );
	};

	const onSetLinkRel = useCallback(
		( value ) => {
			setAttributes( { rel: value } );
		},
		[ setAttributes ]
	);

	const onChangeLink = ( {
		url: newURL = '',
		opensInNewTab: newOpensInNewTab,
	} ) => {
		setAttributes( { url: newURL } );
	
		if ( opensInNewTab !== newOpensInNewTab ) {
			onToggleOpenInNewTab( newOpensInNewTab );
		}
	}

	return (
		<>
			{isSelected &&
				<Popover
					position="middle center"
					anchorRef={ anchorRef?.current }
				> 
					{urlIsSet &&
						<div className={`px-4 pt-4 pb-0 text-right`} >
							<Button
								isSecondary={true}
								isSmall={false}
								icon="editor-unlink"
								onClick={ unlinkButton }
								label={ __('unlink') }
							></Button>
						</div>
					}
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={{ 
							url: url, 
							opensInNewTab: opensInNewTab,
						}}
						onChange={ onChangeLink }
					/>
					<PanelBody title={ 'Additional settings' } initialOpen={false} >
						<TextControl
							label={ 'Link rel' }
							value={ rel || '' }
							onChange={ onSetLinkRel }
						/>
					</PanelBody>
				</Popover>

			}
			<Button
				isPrimary={true}
				isDestructive={!urlIsSet}
				isSmall={false}
				isPressed={isSelected}
				className="absolute top-0 right-0 z-10"
				icon="admin-links"
				label={ __('edit wrapper link') }
			></Button>
		</>
	);
}

function LinkContainerEdit( props ) {
	const {
		attributes,
		setAttributes,
		className,
		isSelected,
	} = props;
	const {
		linkTarget,
		rel,
		url,
	} = attributes;

	const onToggleOpenInNewTab = useCallback(
		( value ) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		},
		[ rel, setAttributes ]
	);

	const ref = useRef();
	const blockProps = useBlockProps( { ref } );

	return (
		<>
			<div
				{ ...blockProps }
				className={ blockProps.className }
			>
        <div className={ className } >
          <InnerBlocks />
        </div>
				<URLPicker
					url={ url }
					rel={ rel }
					isSelected={ isSelected }
					setAttributes={ setAttributes }
					opensInNewTab={ linkTarget === '_blank' }
					onToggleOpenInNewTab={ onToggleOpenInNewTab }
					anchorRef={ ref }
				/>
			</div>
		</>
	);
}

export default LinkContainerEdit;
