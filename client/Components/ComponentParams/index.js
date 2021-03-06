import React from 'react';
import Tooltip from '../BibliothecaUI/Tooltip';
import ParamSelector from './ParamSelector';

import './index.scss';

/**
 * @description
 * a list of selectors to choose params
 * 
 * @param {array} params list of param objects to show a selector
 */
export default class ComponentParams extends React.Component {
    /**
     * report change to parent with the name of the param
     * @param {event|null} e not all selectors can provide the event of the tap
     * @param {string} paramName 
     * @param {any} newValue 
     */
    onChange(e, paramName, newValue) {
        this.props.onChange && this.props.onChange(e, paramName, newValue);
    }

    /**
     * Render a single selector from the list
     * @param {object} paramObj 
     */
    renderSelector(paramObj) {
        const isOptional = paramObj.type.type === "OptionalType";
        const paramTitleStyle = paramObj.description ? {cursor: "pointer"} : null;
        return (
            <div className="bibliotheca-component-params-selector" data-param={paramObj.name} key={`param-name-${paramObj.name}-${this.props.componentName}`}>
                <Tooltip tooltip={paramObj.description}>
                    <p className="bibliotheca-param-name" style={paramTitleStyle}>
                        {paramObj.name}
                        {!isOptional && <span>*</span>}
                    </p>
                </Tooltip>
                <ParamSelector
                    key={`selector-for-${paramObj.name}-${this.props.componentName}`}
                    name={paramObj.name}
                    type={paramObj.type}
                    selectedValue={paramObj.value}
                    onChange={(e, newValue) => this.onChange(e, paramObj.name, newValue)}/>
            </div>
        );
    }

    /**
     * render the list of params as selectors
     */
    render() {
        const selectors = (this.props.params || []).map(paramObj => this.renderSelector(paramObj));
        return (
            <div className="bibliotheca-component-params">
                {selectors}
                {selectors.length === 0 && 'None'}
            </div>
        );
    }
}