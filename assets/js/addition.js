class Modal extends StaticComponent{
	
	_addition(){
		this.self.classList.add("d-none")
		this.closeButtons = []

		this.addChild(Button,"closeButton").click(()=>{
			this.show(false)
		})
	}

	fakeCheckbox(fake,origin,radio){
		fake.addEventListener("click",()=>{
			if (radio){
				radio.forEach((checkbox)=>{
					checkbox.self.checked = false
					checkbox.fake.classList.remove("checkboxed--active")
				})
			}
			fake.classList.toggle("checkboxed--active")
			origin.checked = !origin.checked
		})
	}

	show(value){
		this.self.classList[value?"remove":"add"]("d-none")
		this.back?.show(value)
	}

}

class ModalBack extends Edge{
	
	constructor({self,subscribers}){
		super({self,subscribers})
		this.subscribers.forEach((subscriber)=>subscriber.back=this)
		this.self.addEventListener("click",()=>{
			this.subscribers.forEach((subscriber)=>{
				this.self.classList.add("d-none")
				subscriber.show(false)
			})
		})
		this.self.classList.add("d-none")
	}

	show(value){
		this.self.classList[value?"remove":"add"]("d-none")
	}
}

class ModalRegister extends Modal{
	constructor({
		self,
		mode,
		root,
		subscribers
	}){

		super({
			self,
			mode,
			root,
			subscribers
		})
		this._set()
	}

	_set(){
		this.fakeCheckbox(
			this.get("subscribe"),
			this.get("checkboxSubscribe")
		)
		this.fakeCheckbox(
			this.get("agree"),
			this.get("checkboxAgree")
		)
		this.addChild(Input,'inputMail')
		this.addChild(Input,'inputPhone')
		this.addChild(Button,'withMail').click(()=>{
			this.withMail.self.classList.add("lighted")
			this.withPhone.self.classList.remove("lighted")
			this.inputMail.self.classList.remove("d-none")
			this.inputPhone.self.classList.add("d-none")
			this.inputPhone.clear()
		})
		this.addChild(Button,'withPhone')
		.click(()=>{
			this.withMail.self.classList.remove("lighted")
			this.withPhone.self.classList.add("lighted")
			this.inputPhone.self.classList.remove("d-none")
			this.inputMail.self.classList.add("d-none")
			this.inputMail.clear()
		})
	}

}

class ModalLogin extends Modal{
	constructor({
		self,
		mode,
		root,
		subscribers
	}){

		super({
			self,
			mode,
			root,
			subscribers
		})
		this._set()
	}

	_set(){
		this.addChild(Input,'inputMail')
		this.addChild(Input,'inputPhone')
		this.addChild(Button,'withMail').click(()=>{
			this.withMail.self.classList.add("lighted")
			this.withPhone.self.classList.remove("lighted")
			this.inputMail.self.classList.remove("d-none")
			this.inputPhone.self.classList.add("d-none")
			this.inputPhone.clear()
		})
		this.addChild(Button,'withPhone')
		.click(()=>{
			this.withMail.self.classList.remove("lighted")
			this.withPhone.self.classList.add("lighted")
			this.inputPhone.self.classList.remove("d-none")
			this.inputMail.self.classList.add("d-none")
			this.inputMail.clear()
		})

	}

}

class ModalQuestion extends Modal{
	constructor({
		self,
		mode,
		root,
		subscribers
	}){
		super({
			self,
			mode,
			root,
			subscribers
		})
		this._set()
		this.self.classList.remove("d-none")
	}

	_set(){
		let radio = [
			{
				self:this.get("checkboxAlwaysDisplay"),
				fake:this.get("alwaysDisplay")
			},
			{
				self:this.get("checkboxOftenDisplay"),
				fake:this.get("oftenDisplay")
			},
			{
				self:this.get("checkboxNeverDisplay"),
				fake:this.get("neverDisplay")
			}
		]
		radio[1].self.checked = true
		radio[1].fake.classList.add("checkboxed--active")

		this.fakeCheckbox(
			this.get("alwaysDisplay"),
			this.get("checkboxAlwaysDisplay"),
			radio
		)
		this.fakeCheckbox(
			this.get("oftenDisplay"),
			this.get("checkboxOftenDisplay"),
			radio
		)
		this.fakeCheckbox(
			this.get("neverDisplay"),
			this.get("checkboxNeverDisplay"),
			radio
		)

		this.addChild(Edge,"questionWrapper")

		this.addChild(Edge,"wrapperInput")
		this.addChild(Output,"question")
		this.addChild(Input,"inputAnswer")
		this.addChild(Button,"buttonSend").click(()=>{
			this.inputAnswer.value = ""
			this.wrapperOutput.self.classList.remove("d-none")
			this.wrapperInput.self.classList.add("d-none")
		})
		this.addChild(Button,"buttonSettings").click(()=>{
			this.questionWrapper.self.classList.add("d-none")
			this.settingsWrapper.self.classList.remove("d-none")
		})

		this.addChild(Edge,"wrapperOutput")
		this.addChild(Output,"answer")
		this.addChild(Button,"buttonAgain").click(()=>{
			this.wrapperOutput.self.classList.add("d-none")
			this.wrapperInput.self.classList.remove("d-none")
		})


		this.addChild(Edge,"settingsWrapper")
		this.addChild(Button,"buttonSettingsClose").click(()=>{
			this.questionWrapper.self.classList.remove("d-none")
			this.settingsWrapper.self.classList.add("d-none")
		})
		this.addChild(Button,"buttonSettingsSave").click(()=>{
			this.questionWrapper.self.classList.remove("d-none")
			this.settingsWrapper.self.classList.add("d-none")
		})
	}
}