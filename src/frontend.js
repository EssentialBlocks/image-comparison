jQuery(document).ready(function ($) {
	$(".eb-image-comparison-wrapper").each(function () {
		let _this = $(this),
			overlay = _this.attr("data-overlay") == "true" ? true : false,
			hover = _this.attr("data-hover") == "true" ? true : false,
			position = _this.attr("data-position"),
			beforeLabel = _this.attr("data-before-label"),
			afterLabel = _this.attr("data-after-label"),
			lineColor = _this.attr("data-line-color"),
			lineWidth = _this.attr("data-line-width"),
			arrowColor = _this.attr("data-arrow-color");

		_this.imagesLoaded(function () {
			_this.twentytwenty({
				default_offset_pct: position,
				no_overlay: !overlay,
				before_label: beforeLabel,
				after_label: afterLabel,
				move_slider_on_hover: hover,
				click_to_move: true,
			});

			let handle = _this.find(".twentytwenty-handle");

			// Add line markup
			handle.prepend('<div class="handle-before"></div>');
			handle.append('<div class="handle-after"></div>');

			// Selectors
			let handleBefore = _this.find(".handle-before");
			let handleAfter = _this.find(".handle-after");
			let leftArrow = _this.find(".twentytwenty-left-arrow");
			let rightArrow = _this.find(".twentytwenty-right-arrow");

			// Apply styles
			handle.css({
				border: `${lineWidth}px solid ${lineColor}`,
			});

			handleBefore.css({
				"background-color": lineColor,
				width: lineWidth,
			});

			handleAfter.css({
				"background-color": lineColor,
				width: lineWidth,
			});

			leftArrow.css({ "border-right-color": arrowColor });
			rightArrow.css({ "border-left-color": arrowColor });
		});
	});
});
