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

    this.el.btnAttachPhoto.on("click", (e) => {
      console.log("foto");
    });

    this.el.btnAttachCamera.on("click", (e) => {
      console.log("camera");
    });

    this.el.btnAttachDocument.on("click", (e) => {
      console.log("documento");
    });

    this.el.btnAttachContact.on("click", (e) => {
      console.log("contato");
    });
  }

  closeMenuAttach(e) {
    document.removeEventListener("click", this.closeMenuAttach);
    this.el.menuAttach.removeClass("open");
    console.log("remove");
  }

  closeAllLeftPanel() {
    this.el.panelAddContact.hide();
    this.el.panelEditProfile.hide();
  }
}
