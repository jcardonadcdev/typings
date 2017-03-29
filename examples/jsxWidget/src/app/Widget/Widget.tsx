import * as _WidgetBase from 'dijit/_WidgetBase';
import * as i18n from 'dojo/i18n!./nls/main';
import declare from '../declareDecorator';
import * as maquette from '../../../node_modules/maquette/src/maquette';

interface Widget extends _WidgetBase { }

const projector: maquette.Projector = maquette.createProjector();
const h = maquette.h;

@declare(_WidgetBase)
class Widget {

	constructor(params: Object, srcNodeRef: string | Node) { };

	domNode: HTMLElement;

	chosenBeer: string;

  // -----------------------------------------
	//  Widget Lifecycle
	// -----------------------------------------
	startup = () => {
		projector.append(this.domNode, this.render);
	};

	render = () => {
		const beerChoices = i18n.widgetBeerTypes;
		const title = i18n.widgetDescription;

		const choiceElement = beerChoices.map((item: string, key: number) => {
			return h('div', [
				h('input', {
					type: 'radio',
					value: item,
					name: 'beer',
					onchange: this.handleBeerChoiceChange
				}), item
			]);
		});

		const titleElement = h('div', [
			h('h3', [title])
		]);

		const feedbackElement = h('h4', [this.chosenBeer ? this.chosenBeer + '  ' + i18n.widgetFeedbackText : '']);

		return h('div', [titleElement, choiceElement, feedbackElement]);
	};

	handleBeerChoiceChange = (evt: any) => {
		this.chosenBeer = evt.target.value;
	};
}

export default Widget;
