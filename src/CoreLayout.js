import React, { Component } from "react"
import {
	Route,
	Switch
} from "react-router-dom"
import cn from 'classnames'
import axios from 'axios'
import { asyncSelect, simpleAnimateOnAppear } from 'globals/helpers'
import {
	TimelineMax,
	Power3,
} from 'gsap'
import { API } from 'store/constants'
import Menu from 'components/Menu'
import Entertainment from 'routes/Entertainment'
import Contact from 'routes/Contact'
import Vis from 'routes/Vis'
import Mozgi from 'routes/Mozgi'
import MichelleTemp from 'routes/MichelleTemp'
import Dorofeeva from 'routes/Dorofeeva'

import MzgPreload from 'components/_mzg/MzgPreload'


import Tv from "routes/Tv";

import "./CoreLayout.sass"

export default class CoreLayout extends Component {
	constructor(props) {
		super(props);
		this.scrollHandler = null;
		this.state = {
			lang: 'ua',
			menu: false,
			isLoaded: false,
			headerTransp: false,
			headerMode: '',
		}
	}

	componentDidMount() {
		axios.get(`${API}menu`)
			.then(res => this.setState({
				menu: res.data[0].acf,
				isLoaded: true,
			}))
			.catch(err => console.log(err))
	}
	async componentDidUpdate(prevProps, prevState) {
		if (this.state.isLoaded && window.innerWidth > 780) {

			const slidingElems = await asyncSelect('.animSlide')
			const isMac = /Macintosh/.test(navigator.userAgent)

			if (isMac) {
				console.log('Mac')
				const slidingElems = await asyncSelect('.animSlide')
				setTimeout(() => {
					const arr = Array.from(slidingElems)
					for (let elem of arr) {
						elem.style.opacity = 1
					}
				}, 200);

			} else {
				const slideText = async (element) => {
					const tl = new TimelineMax({ paused: true })
					tl
						.fromTo(element, 1.5, { y: 35, alpha: 0, ease: Power3.easeOut }, { y: 0, alpha: 1 })
						.delay(0.2)
						.play()
				}
				simpleAnimateOnAppear(slidingElems, slideText)
			}
		}
	}

	componentWillUnmount() {
		if (this.scrollHandler) {
			document.querySelector('#root').removeEventListener('scroll', this.scrollHandler)
		}
	}

	setLang = (code) => {
		this.setState({
			lang: code,
		})
	}

	toggleHeader = (arg) => {
		const value = arg === undefined ? !this.state.headerTransp : arg;
		this.setState({
			headerTransp: value,
		})
	}

	toggleHeaderMode = (mode) => {
		if (this.state.headerMode !== mode) {
			this.setState({
				headerMode: mode
			})
		}
	}

	render() {
		const {
			lang,
			menu,
			isLoaded,
			headerTransp,
			headerMode,
		} = this.state;
		return (
			<div className="app">
				<header className={cn("header", { "header__hide": headerTransp })}>
					{
						isLoaded
						&&
						<Menu setLang={this.setLang} lang={lang} footer={menu.footer} mode={headerMode} data={menu.menu} />

					}
				</header>

				<Switch>
					<Route exact path="/" render={(props) => <Entertainment {...props} lang={lang} contactsData={isLoaded ? menu.contacts : null} footerData={isLoaded ? menu.footer : null} toggleHeaderMode={this.toggleHeaderMode} />} />
					<Route exact path="/vis" render={(props) => <Vis {...props} lang={lang} toggleHeader={this.toggleHeader} contactsData={isLoaded ? menu.contacts : null} footerData={isLoaded ? menu.footer : null} toggleHeaderMode={this.toggleHeaderMode} />} />
					<Route exact path="/mozgi" render={(props) => <MzgPreload {...props} lang={lang} toggleHeaderMode={this.toggleHeaderMode} />} />
					<Route exact path="/mozgipage" render={(props) => <Mozgi {...props} lang={lang} toggleHeader={this.toggleHeader} contactsData={isLoaded ? menu.contacts : null} footerData={isLoaded ? menu.footer : null} toggleHeaderMode={this.toggleHeaderMode} />} />
					<Route exact path="/michelle" render={(props) => <MichelleTemp {...props} lang={lang} toggleHeader={this.toggleHeader} contactsData={isLoaded ? menu.contacts : null} footerData={isLoaded ? menu.footer : null} toggleHeaderMode={this.toggleHeaderMode} />} />
					<Route exact path="/dorofeeva" render={(props) => <Dorofeeva {...props} lang={lang} toggleHeader={this.toggleHeader} contactsData={isLoaded ? menu.contacts : null} footerData={isLoaded ? menu.footer : null} toggleHeaderMode={this.toggleHeaderMode} />} />
					<Route exact path="/tv" render={(props) => <Tv {...props} lang={lang} footerData={isLoaded ? menu.footer : null} toggleHeader={this.toggleHeader} toggleHeaderMode={this.toggleHeaderMode} />} />
					<Route exact path="/contact" render={(props) => <Contact {...props} lang={lang} contactsData={isLoaded ? menu.contacts : null} footerData={isLoaded ? menu.footer : null} />} />
					<Route render={(props) => <Entertainment {...props} lang={lang} contactsData={isLoaded ? menu.contacts : null} footerData={isLoaded ? menu.footer : null} toggleHeaderMode={this.toggleHeaderMode} />} />
				</Switch>

			</div>
		);
	}
}
