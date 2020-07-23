/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { MediaUpload } from "@wordpress/block-editor";
/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import ReactCompareImage from "./ReactCompareImage";
import uuid from "../util/uuid";

export default class Edit extends Component {
	componentDidMount() {
		let id = uuid().substr(0, 5);
		this.props.setAttributes({ id });
	}

	onSliderChange = (position) => this.props.setAttributes({ position });

	onImageSwap = () => {
		let { leftImageURL, rightImageURL, swap } = this.props.attributes;
		swap = !swap;
		[leftImageURL, rightImageURL] = [rightImageURL, leftImageURL];

		this.props.setAttributes({ swap, leftImageURL, rightImageURL });
	};

	render() {
		const { isSelected, attributes, setAttributes } = this.props;
		const {
			leftImageURL,
			rightImageURL,
			hover,
			fullWidth,
			imageWidth,
			position,
			swap,
			lineWidth = lineWidth || 3,
			lineColor,
			arrowColor,
		} = attributes;

		const hasBothImages = leftImageURL && rightImageURL;

		const wrapperStyles = {
			width: fullWidth ? "100%" : imageWidth,
		};

		const imageStyles = {
			height: 200,
			width: 200,
		};

		return [
			isSelected && (
				<Inspector
					key="inspector"
					attributes={attributes}
					setAttributes={setAttributes}
					onImageSwap={this.onImageSwap}
				/>
			),

			<div
				key="wrapper"
				className="eb-image-comparison-wrapper"
				style={wrapperStyles}
			>
				{hasBothImages ? (
					<ReactCompareImage
						leftImage={leftImageURL}
						rightImage={rightImageURL}
						hover={hover}
						sliderPositionPercentage={position}
						onSliderPositionChange={this.onSliderChange}
						sliderLineWidth={lineWidth}
						handleSize={45}
						handleColor={lineColor}
						sliderLineColor={lineColor}
						arrowColor={arrowColor}
					/>
				) : (
					<div className="eb-image-comparison-placeholder">
						<MediaUpload
							onSelect={(media) => setAttributes({ leftImageURL: media.url })}
							type="image"
							value={leftImageURL}
							render={({ open }) =>
								!leftImageURL ? (
									<Button
										className="eb-image-comparison-upload components-button"
										label={__("Upload Left Image")}
										icon="format-image"
										onClick={open}
									/>
								) : (
									<img src={leftImageURL} style={imageStyles} />
								)
							}
						/>

						<MediaUpload
							onSelect={(media) => setAttributes({ rightImageURL: media.url })}
							type="image"
							value={rightImageURL}
							render={({ open }) =>
								!rightImageURL ? (
									<Button
										className="eb-image-comparison-upload components-button"
										label={__("Upload Right Image")}
										icon="format-image"
										onClick={open}
									/>
								) : (
									<img src={rightImageURL} style={imageStyles} />
								)
							}
						/>
					</div>
				)}
			</div>,
		];
	}
}
