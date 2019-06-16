

import React, { Component, Fragment } from 'react';
import Chips from './chips'
import { connect } from 'react-redux'
import {
    removesearch,
    searchauto,
    addsearch
} from '../actions'
class Main extends Component {
    state = { search: "", show: false }
    searchText = React.createRef();
    ac = React.createRef();
    app = React.createRef();
    searchData = (e) => {

        const text = e.target.value


        this.setState(() => ({ search: text, show: true }), () => {
            this.calfunc(text)
        })
    }
    debounce = (func, delay) => {
        let inDebounce
        return function () {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }
    calfunc = this.debounce(this.props.searchauto, 200)
    selectSearch = (val) => {
        this.setState(() => ({ search: "", show: false }))
        this.props.addsearch(val)
        this.searchText.current.focus()
    }
    handleClose = (val) => {
        this.setState(() => ({ show: false }))
        this.props.removesearch(val);
    }
    autocomplete = (data, bool) => {
        const { search } = this.state;
        return data.map(val => {
            if (bool)
                return (<div key={val.id} className="Chips rounded">
                    <Chips val={val} text={val.text} icon={val.icon} handleClose={this.handleClose} bool={true}></Chips>
                </div>);
            else {
                return (<div key={val.id} className="Chips" onClick={() => this.selectSearch(val)}>
                    <Chips val={val} text={val.text} icon={val.icon} handleClose={this.handleClose} search={search}></Chips>
                </div>);
            }
        })
    }
    componentDidMount() {
        this.searchText.current.focus();
    }
    componentDidUpdate() {
        //this.searchText.current.focus()
        if (this.ac.current) {
            this.ac.current.style.top = this.searchText.current.offsetTop + 55 + "px"
            this.ac.current.style.left = this.searchText.current.offsetLeft + "px"
        }
    }

    onClick = () => {
        this.setState(() => ({ show: true }))
    }
    onkeydown = (e) => {
        e.stopPropagation()
        if (e.which == 8 && this.state.search.length < 1 && this.props.autocomplete.Selected.length > 0) {
            e.currentTarget.previousSibling.classList.add("border")
            this.setState(() => ({ show: false }))
            this.searchText.current.blur();
            this.app.current.focus();

        }
        let bool = e.which >= 65 && e.which <= 90 || // A-Z
            e.which >= 97 && e.which <= 122 || // a-z
            e.which >= 48 && e.which <= 57 && !e.shiftKey || e.which == 8
        if (!bool) {
            e.preventDefault();
        }
    

    }
    handleKey = (e) => {
        e.stopPropagation()
        if (e.which === 8) {
            let elem = document.querySelector(".border")
            if (elem) {
                this.setState(() => ({ show: false }))
                this.props.removesearch(this.props.autocomplete.Selected[this.props.autocomplete.Selected.length - 1])
                this.searchText.current.focus();
            }
        }

    }
    render() {

        const { loading,
            data, error, Selected } = this.props.autocomplete;
        const { show } = this.state
        return (
            <div ref={this.app} className="mainApp" tabIndex="1" onKeyDown={(e) => this.handleKey(e)}>
                <div className="App">
                    <div className="selectedautocomplete">
                        {this.autocomplete(Selected, true)}
                        <input type="text" className="autocomplete" placeholder="Select the name" onKeyDown={this.onkeydown} onClick={this.onClick} ref={this.searchText} value={this.state.search} onChange={($event) => this.searchData($event)} />
                    </div>
                    {show ? <div className="autocomplete" ref={this.ac}>
                        {this.autocomplete(data, false)}
                    </div> : ""}
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    removesearch: (val) => dispatch(removesearch(val)),
    searchauto: (val) => dispatch(searchauto(val)),
    addsearch: (val) => dispatch(addsearch(val))

})
const mapStateToProps = state => ({
    autocomplete: state.autocomplete,
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
