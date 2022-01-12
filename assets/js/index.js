window.addEventListener("load",run, false);

let burgerButton,
	burgerMenu,
	modalRegister

function setup(){
	// === [ Window scroll handling ] === //

	let previousY = 0
	let body = document.querySelector("body")
	let header = document.querySelector(".header")
	body.style.paddingTop = header.offsetHeight + "px"

	window.addEventListener('scroll', function(e) {
		if (window.scrollY > header.offsetHeight * 3){
			if (window.scrollY < previousY){
				header.classList.remove("header--hiden")
			} else {
				header.classList.add("header--hiden")
				previousY = window.scrollY
			}
		} else {
			header.classList.remove("header--hiden")
		}
	});
	window.addEventListener('resize',function(e){
		if (window.scrollY > header.offsetHeight * 3){
			if (window.scrollY < previousY){
				header.classList.remove("header--hiden")
			} else {
				header.classList.add("header--hiden")
				previousY = window.scrollY
			}
		} else {
			header.classList.remove("header--hiden")
		}
		body.style.paddingTop = header.offsetHeight + "px"
	})
}


function run(){
	setup()
	
	// === [ Burger menu ] === //

	mobileMenu = {
		burgerMenu : new StaticComponent({
			self:document.querySelector('[data-el="burgerMenu"]')
		})
	}
	mobileMenu.burgerButtonOpen = new Button({
		self:document.querySelector('[data-el="burgerButton-Open"]')
	}).click(()=>{
		mobileMenu.burgerMenu.self.classList.add("burger-menu--active")
	})
	mobileMenu.burgerButtonClose = new Button({
		self:document.querySelector('[data-el="burgerButton-Close"]')
	}).click(()=>{
		mobileMenu.burgerMenu.self.classList.remove("burger-menu--active")
	})

	window.addEventListener("resize", function(e) {
	    mobileMenu.burgerMenu.self.classList.remove("burger-menu--active")
	    if (e.target.outerWidth>800){
	    	// document.querySelector("#myChart").style.height = 100
	    }
	});

	// === [ Register modal ] === //

	modals = {
		modalRegister : new ModalRegister({
			self:document.querySelector("[data-el='modalRegister']")
		}),
		modalLogin : new ModalLogin({
			self:document.querySelector("[data-el='modalLogin']")
		}),
		modalCopyright: new Modal({
			self:document.querySelector("[data-el='modalCopyright']")
		}),
		modalAgreement: new Modal({
			self:document.querySelector("[data-el='modalAgreement']")
		}),
		modalSecurity: new Modal({
			self:document.querySelector("[data-el='modalSecurity']")
		}),
		modalQuestion : new ModalQuestion({
			self:document.querySelector("[data-el='modalQuestion']")
		}),
		buttonsRegister : [],
		buttonsLogin : []
	}



	modals.modalBack =  new ModalBack({
		self:document.querySelector("[data-el='modalBack']"),
		subscribers:[
			modals.modalRegister,
			modals.modalLogin,
			modals.modalSecurity,
			modals.modalAgreement,
			modals.modalCopyright
		]
	})

	document.querySelector("#agreement")?.addEventListener("click",()=>{
		modals.modalAgreement.show(true)
	})
	document.querySelector("#security")?.addEventListener("click",()=>{
		modals.modalRegister.show(false)
		modals.modalSecurity.show(true)
	})
	document.querySelector("#copyright")?.addEventListener("click",()=>{
		console.log(modals.modalSecurity)
		modals.modalAgreement.show(false)
		modals.modalCopyright.show(true)
	})

	document.querySelectorAll("[data-el='buttonRegister'],[data-el='buttonLogin']").forEach((button)=>{
		let type = button.dataset.el.endsWith("Register")?"Register":"Login"
		modals.buttonsRegister.push(new Button({
			self:button
		}).click(()=>{
			modals["modal"+type].show(true)
			mobileMenu.burgerMenu.self.classList.remove("burger-menu--active")
		}))
	})

}