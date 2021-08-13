// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { CartesianOrientations, Events, RenderTypes } from '../../interfaces';
import { Tools } from '../../tools';

// D3 Imports
// @ts-ignore
// ts-ignore is needed because `@types/d3`
// is missing the `pointer` function
import { Selection, select, pointer } from 'd3-selection';

type GenericSvgSelection = Selection<SVGElement, any, SVGElement, any>;

const THRESHOLD = 7.5;

/** check if x is inside threshold area extents  */
function pointIsWithinThreshold(dx: number, x: number) {
	return dx > x - THRESHOLD && dx < x + THRESHOLD;
}

export class Ruler extends Component {
	type = 'ruler';
	renderType = RenderTypes.SVG;

	backdrop: GenericSvgSelection;
	elementsToHighlight: GenericSvgSelection;

	isXGridEnabled = Tools.getProperty(
		this.getOptions(),
		'grid',
		'x',
		'enabled'
	);
	isYGridEnabled = Tools.getProperty(
		this.getOptions(),
		'grid',
		'y',
		'enabled'
	);
	// flag for checking whether ruler event listener is added or not
	isEventListenerAdded = false;

	render() {
		const isRulerEnabled = Tools.getProperty(
			this.getOptions(),
			'ruler',
			'enabled'
		);

		this.drawBackdrop();

		if (isRulerEnabled && !this.isEventListenerAdded) {
			this.addBackdropEventListeners();
		} else if (!isRulerEnabled && this.isEventListenerAdded) {
			this.removeBackdropEventListeners();
		}
	}

	removeBackdropEventListeners() {
		this.isEventListenerAdded = false;
		this.backdrop.on('mousemove mouseover mouseout', null);
	}

	formatTooltipData(tooltipData) {
		return tooltipData;
	}

	showRuler([x, y]: [number, number]) {
		const svg = this.parent;

		const orientation: CartesianOrientations = this.services.cartesianScales.getOrientation();

		const rangeScale = this.services.cartesianScales.getRangeScale();
		const [yScaleEnd, yScaleStart] = rangeScale.range();

		const mouseCoordinate =
			orientation === CartesianOrientations.HORIZONTAL ? y : x;
		const ruler = DOMUtils.appendOrSelect(svg, 'g.ruler').attr(
			'aria-label',
			'ruler'
		);

		const rulerLine = DOMUtils.appendOrSelect(ruler, 'line.ruler-line');
		const dataPointElements: GenericSvgSelection = svg.selectAll(
			'[role=graphics-symbol]'
		);

		const elementsToHighlight = dataPointElements.filter((d) => {
			const domainValue = this.services.cartesianScales.getDomainValue(d);
			// console.log("d", d, domainValue)

			return pointIsWithinThreshold(domainValue, mouseCoordinate);
		});

		// some data point match
		if (elementsToHighlight.size() > 0) {
			/** if we pass from a trigger area to another one
			 * mouseout on previous elements won't get dispatched
			 * so we need to do it manually
			 */
			if (
				this.elementsToHighlight &&
				this.elementsToHighlight.size() > 0 &&
				!Tools.isEqual(this.elementsToHighlight, elementsToHighlight)
			) {
				this.hideRuler();
			}

			elementsToHighlight.dispatch('mouseover');

			// set current hovered elements
			this.elementsToHighlight = elementsToHighlight;

			this.services.events.dispatchEvent(Events.Tooltip.SHOW, {
				mousePosition: [x, y],
				hoveredElement: rulerLine,
				data: this.formatTooltipData(elementsToHighlight.data()),
			});

			ruler.attr('opacity', 1);

			// line snaps to matching point
			const sampleMatchData = select(
				elementsToHighlight.nodes()[0]
			).datum() as any;

			const rulerPosition = this.services.cartesianScales.getDomainValue(
				sampleMatchData
			);

			if (orientation === 'horizontal') {
				rulerLine
					.attr('x1', yScaleStart)
					.attr('x2', yScaleEnd)
					.attr('y1', rulerPosition)
					.attr('y2', rulerPosition);
			} else {
				rulerLine
					.attr('y1', yScaleStart)
					.attr('y2', yScaleEnd)
					.attr('x1', rulerPosition)
					.attr('x2', rulerPosition);
			}
		} else {
			this.hideRuler();
		}
	}

	hideRuler() {
		const svg = this.parent;
		const ruler = DOMUtils.appendOrSelect(svg, 'g.ruler');

		this.elementsToHighlight.dispatch('mouseout');
		this.services.events.dispatchEvent(Events.Tooltip.HIDE);
		ruler.attr('opacity', 0);
	}

	/**
	 * Adds the listener on the X grid to trigger multiple point tooltips along the x axis.
	 */
	addBackdropEventListeners() {
		this.isEventListenerAdded = true;

		const self = this;

		const holder = this.services.domUtils.getHolder();

		const displayData = this.model.getDisplayData();

		let mouseMoveCallback = function (event) {
			const pos = pointer(event, self.parent.node());

			self.showRuler(pos);
		};

		// // Debounce mouseMoveCallback if there are more than 100 datapoints
		// if (displayData.length > 100) {
		// 	const debounceThreshold = (displayData.length % 50) * 12.5;

		// 	mouseMoveCallback = Tools.debounceWithD3MousePosition(
		// 		function () {
		// 			const { mousePosition } = this;
		// 			self.showRuler(mousePosition);
		// 		},
		// 		debounceThreshold,
		// 		holder
		// 	);
		// }

		this.backdrop
			.on('mousemove mouseover', mouseMoveCallback)
			.on('mouseout', this.hideRuler.bind(this));
	}

	drawBackdrop() {
		const svg = this.parent;

		// Get height from the grid
		this.backdrop = DOMUtils.appendOrSelect(svg, 'svg.chart-grid-backdrop');
	}
}
