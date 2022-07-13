import * as React from "react";

const accordionConfig = [
    {
        title: 'Delivery details',
        content: 'Delivery details content goes here'
    },
    {
        title: 'Payment options',
        content: 'Payment options content goes here'
    },
    {
        title: 'Return policy',
        content: 'Return policy content goes here'
    }
];

export default class Accordion extends React.Component<any, any> {

    state = {
        activeItem: false
    }

    /**
     * Accordion row click
     * @param item
     */
    handleClick = (item) => {
        let current = item === this.state.activeItem ? false : item;

        this.setState({
            activeItem: current
        })
    }

    /**
     * Display accordion row
     * @param item
     * @param index
     */
    renderItem = (item, index) => {
        return <div className="item">
            <div className="title" onClick={() => this.handleClick(index)}>
                {item.title}
                <span className="material-symbols-outlined">expand_more</span>
            </div>
            <div className="content">{item.content}</div>
        </div>
    }

    /**
     * List accordion rows
     * @param items
     */
    renderItems = (items) => {
        return items.map((item, index) => {
            let active = this.state.activeItem === index ? 'true' : '';

            return (
                <div
                    className="row"
                    data-active={active}
                    data-row={index}
                    key={index}>
                    {this.renderItem(item, index)}
                </div> // 🐼
            )
        });
    }

    render() {
        return (
            <div className='accordion-wrapper'>
                <h3>FAQ</h3>
                {this.renderItems(accordionConfig)}
            </div>
        );
    }
}
