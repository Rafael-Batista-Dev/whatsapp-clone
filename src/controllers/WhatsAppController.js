class WhatsAppController {
  constructor() {
    console.log("hello world");

    this.elementsPrototype();
    this.loadElements();
    this.initEvent();
  }

  loadElements() {
    this.el = {};

    document.querySelectorAll("[id]").forEach((element) => {
      this.el[Format.getCamelCase(element.id)] = element;
    });
  }

  elementsPrototype() {
    Element.prototype.hide = function () {
      this.style.display = "none";
      return this;
    };

    Element.prototype.show = function () {
      this.style.display = "block";
      return this;
    };

    Element.prototype.toggle = function () {
      this.style.display = this.style.display === "none" ? "block" : "none";
      return this;
    };

    Element.prototype.on = function (events, fn) {
      events.split(" ").forEach((event) => {
        this.addEventListener(event, fn);
      });
      return this;
    };

    Element.prototype.css = function (styles) {
      for (let name in styles) {
        this.style[name] = styles[name];
      }
      return this;
    };

    Element.prototype.addClass = function (name) {
      this.classList.add(name);
      return this;
    };

    Element.prototype.removeClass = function (name) {
      this.classList.remove(name);
      return this;
    };

    Element.prototype.toggleClass = function (name) {
      this.classList.toggle(name);
      return this;
    };

    Element.prototype.hasClass = function (name) {
      return this.classList.contains(name);
    };

    //recuperando o form
    HTMLFormElement.prototype.getForm = function () {
      return new FormData(this);
    };

    HTMLFormElement.prototype.toJSON = function () {
      let json = {};

      this.getForm().forEach((value, key) => {
        json[key] = value;
      });

      return json;
    };
  }

  initEvent() {
    //Menu foto
    this.el.myPhoto.on("click", (e) => {
      this.closeAllLeftPanel();
      this.el.panelEditProfile.show();
      setTimeout(() => {
        this.el.panelEditProfile.addClass("open");
      }, 300);
    });

    //menu add contato
    this.el.btnNewContact.on("click", (e) => {
      this.closeAllLeftPanel();
      this.el.panelAddContact.show();
      setTimeout(() => {
        this.el.panelAddContact.addClass("open");
      }, 300);
    });

    this.el.btnClosePanelEditProfile.on("click", (e) => {
      this.el.panelEditProfile.removeClass("open");
    });

    this.el.btnClosePanelAddContact.on("click", (e) => {
      this.el.panelAddContact.removeClass("open");
    });

    //carregar foto
    this.el.photoContainerEditProfile.on("click", (e) => {
      this.el.inputProfilePhoto.click();
    });

    this.el.inputNamePanelEditProfile.on("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.el.btnSavePanelEditProfile.click();
      }
    });

    //button de savar nome
    this.el.btnSavePanelEditProfile.on("click", (e) => {
      console.log(this.el.inputNamePanelEditProfile.innerHTML);
    });

    //submetendo o formulário de email
    this.el.formPanelAddContact.on("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(this.el.formPanelAddContact);
    });

    this.el.contactsMessagesList
      .querySelectorAll(".contact-item")
      .forEach((item) => {
        item.on("click", (e) => {
          this.el.home.hide();
          this.el.main.css({
            display: "flex",
          });
        });
      });

    this.el.btnAttach.on("click", (e) => {
      //tratando procagação dos eventos ateriores
      e.stopPropagation();
      this.el.menuAttach.addClass("open");

      //removendo o menu aou clicar fora, a função bind amplia o escopo do this
      document.addEventListener("click", this.closeMenuAttach.bind(this));
    });

    //=============Carregamento de fotos===========
    this.el.btnAttachPhoto.on("click", (e) => {
      this.el.inputPhoto.click();
    });
    this.el.inputPhoto.on("change", (e) => {
      console.log(this.el.inputPhoto.files);

      [...this.el.inputPhoto.files].forEach((file) => {
        console.log(file);
      });
    });
    //===================photo====================

    //===============Painel camera================
    this.el.btnAttachCamera.on("click", (e) => {
      this.closeAllMainPanel();
      this.el.panelCamera.addClass("open");
      this.el.panelCamera.css({
        height: "calc(100% - 120px)",
      });
    });

    this.el.btnClosePanelCamera.on("click", (e) => {
      this.closeAllMainPanel();
      this.el.panelMessagesContainer.show();
    });

    this.el.btnTakePicture.on("click", (e) => {
      console.log("Teke Picture");
    });

    //===================Camera====================

    //=================Document====================
    this.el.btnAttachDocument.on("click", (e) => {
      this.closeAllMainPanel();
      this.el.panelDocumentPreview.addClass("open");
      this.el.panelDocumentPreview.css({
        height: "calc(100% + 50px)",
      });
    });

    this.el.btnClosePanelDocumentPreview.on("click", (e) => {
      this.closeAllMainPanel();
      this.el.panelMessagesContainer.show();
    });

    this.el.btnSendDocument.on("click", (e) => {
      console.log("Send Document");
    });

    //==================Document===================

    //==================Contact====================
    this.el.btnAttachContact.on("click", (e) => {
      this.el.modalContacts.show();
    });
    //==================Contact====================

    //================MicroPhone===================

    this.el.btnSendMicrophone.on("click", (e) => {
      this.el.recordMicrophone.show();
      this.el.btnSendMicrophone.hide();
      this.startRecordMicrophoneTime();
    });

    //cancelar microphone
    this.el.btnCancelMicrophone.on("click", (e) => {
      this.closeRecordMicrophone();
    });

    //finalizar microphone
    this.el.btnFinishMicrophone.on("click", (e) => {
      this.closeRecordMicrophone();
    });
    //================MicroPhone===================

    //================inputText===================

    //Saber qual tecla precionou
    this.el.inputText.on("keypress", (e) => {
      if (e.key === "Enter" && !e.ctrlKey) {
        e.preventDefault();

        this.el.btnSend.click();
      }
    });

    this.el.inputText.on("keyup", (e) => {
      if (this.el.inputText.innerHTML.length) {
        this.el.inputPlaceholder.hide();
        this.el.btnSendMicrophone.hide();
        this.el.btnSend.show();
      } else {
        this.el.inputPlaceholder.show();
        this.el.btnSendMicrophone.show();
        this.el.btnSend.hide();
      }
    });

    //Configurando Emojis
    this.el.btnEmojis.on("click", (e) => {
      this.el.panelEmojis.toggleClass("open");
    });

    //Pegando click do emoji
    this.el.panelEmojis.querySelectorAll(".emojik").forEach((emoji) => {
      emoji.on("click", (e) => {
        let img = this.el.imgEmojiDefault.cloneNode();

        img.style.cssText = emoji.style.cssText;
        img.dataset.unicode = emoji.dataset.unicode;
        img.alt = emoji.dataset.unicode;

        emoji.classList.forEach((name) => {
          img.classList.add(name);
        });

        this.el.inputText.appendChild(img);
        this.el.inputText.dispatchEvent(new Event("keyup"));
      });
    });

    this.el.btnSend.on("click", (e) => {
      console.log(this.el.inputText.innerHTML);
    });
    //================inputText===================

    //
    //
    //
  }

  //metodo para iniciar microphone
  startRecordMicrophoneTime() {
    let start = Date.now();

    this._recordMicrophoneInterval = setInterval(() => {
      this.el.recordMicrophoneTimer.innerHTML = Format.toTime(
        Date.now() - start
      );
    }, 100);
  }

  //metodo para fechar microphone
  closeRecordMicrophone() {
    this.el.recordMicrophone.hide();
    this.el.btnSendMicrophone.show();
    clearInterval(this._recordMicrophoneInterval);
  }

  //metodo para fechar painel
  closeAllMainPanel() {
    this.el.panelMessagesContainer.hide();
    this.el.panelDocumentPreview.removeClass("open");
    this.el.panelCamera.removeClass("open");
  }

  //metodo para fechar menu
  closeMenuAttach(e) {
    document.removeEventListener("click", this.closeMenuAttach);
    this.el.menuAttach.removeClass("open");
  }

  //medoto para fecha painel esquerdo
  closeAllLeftPanel() {
    this.el.panelAddContact.hide();
    this.el.panelEditProfile.hide();
  }
}
