import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormCheckboxWidget } from "./FormCheckboxWidgetClass";
import { Modal, Button } from "react-bootstrap";
import "./FormCheckboxWidget.scss";


const commercialUseEnglishText = `From now on, JustRelate Group GmbH (controller) will inform me about product and service offers as well as company news and industry information by e-mail (e.g. invitations, newsletters, etc.) and/or telephone (e.g. invitations, appointments, surveys, etc.).
</br>
</br>
The e-mail address and telephone numbers I have provided will be used for this purpose. In addition, the postal address I have provided will be used to inform me by post about product and service offers. I am aware that participation in the competition is possible without consent to the use of my personal data for advertising purposes. I can revoke my consent to the use of my data for advertising purposes by e-mail, telephone or post at any time with effect for the future.
</br>
</br>
In order to offer you a service tailored to your interests, after registration we also record your future visits to JustRelate Group websites using cookies, i.e. we can determine when and which posts on our websites were accessed by you. By activating the box, you also consent to this recording. Further information on this can be found in our privacy policy at <a target="_blank" href="https://www.iubenda.com/privacy-policy/26092085">https://www.iubenda.com/privacy-policy/26092085</a>. 
</br>
</br>
You can revoke your consent to the JustRelate Group at any time. All you need to do is send an e-mail to info@justrelate.com.`;

const participationEnglishText = `All persons aged 18 or over who are resident in Germany are eligible to take part in the competition. The JustRelate Group will draw the main prize on 20.09.2024. The winners will be contacted by telephone and e-mail. If the winner cannot be reached after being contacted several times, the claim to the prize expires and the JustRelate Group has the right to draw a replacement winner.
</br>
</br>
Participation is free of charge. Participation is independent of the purchase of benefits and services. The JustRelate Group is not liable for any transmission errors. The JustRelate Group may also modify, suspend or terminate the competition if this is necessary due to force majeure or external circumstances beyond the control of the JustRelate Group or if this is the only way to ensure that the competition can be carried out properly.
</br>
</br>
The prize will not be paid out in cash. Each person may only take part in the competition once. Participation via automated mass participation procedures of third parties is not permitted. Participation is possible during DMEXCO from 18 to 19.09.2024. The JustRelate Group reserves the right to exclude participants from the prize draw in the event of suspected technical manipulation.
</br>
</br>
The applicable privacy policy can be found at <a target="_blank" href="https://www.iubenda.com/privacy-policy/26092085">https://www.iubenda.com/privacy-policy/26092085</a>.`;

const commercialUseGermanText = `Die JustRelate Group GmbH (Verantwortlicher) informiert mich fortan über Produkt- und Dienstleistungsangebote sowie Unternehmensneuigkeiten und Brancheninformationen per E-Mail (z. B. Einladungen, Newsletter etc.) und/oder Telefon (z. B. Einladungen, Terminvereinbarungen, Umfragen etc.). 
</br>
</br>
Dazu werden die von mir angegebene E-Mail-Adresse und Telefonnummern verwendet. Zudem wird die von mir angegebene Postadresse genutzt, um mich fortan per Post über Produkt- und Dienstleistungsangebote zu informieren. Mir ist bekannt, dass die Teilnahme am Gewinnspiel ohne Einwilligung in die werbliche Nutzung meiner personenbezogenen Daten möglich ist. Meine Einwilligung zur Verwendung meiner Daten für Werbezwecke per E-Mail, Telefon oder Post kann ich jederzeit mit Wirkung für die Zukunft widerrufen.
</br>
</br>
Um Ihnen einen auf Ihre Interessen abgestimmten Service anzubieten, erfassen wir nach der Registrierung Ihre künftigen Besuche auf Webseiten der JustRelate Group mithilfe von Cookies auch personenbezogen, d.h. wir können feststellen, wann und welche Beiträge auf unseren Webseiten von Ihnen aufgerufen wurden. Mit Aktivierung der Box willigen Sie auch in diese Erfassung ein. Weitere Informationen hierzu finden Sie in unserer Datenschutzerklärung unter <a target="_blank" href="https://www.iubenda.com/privacy-policy/26092085" >https://www.iubenda.com/privacy-policy/26092085</a>. 
</br>
</br>
Ihre Einwilligung können Sie jederzeit gegenüber der JustRelate Group widerrufen. Hierzu genügt eine E-Mail an info@justrelate.com. `;


const participationGermanText = `Teilnahmeberechtigt für das Gewinnspiel sind alle Personen im Alter von mindestens 18 Jahren mit Wohnsitz in Deutschland. Die JustRelate Group verlost am 20.09.2024 den Hauptpreis. Die Gewinner werden per Telefon und E-Mail kontaktiert. Sofern der Gewinner nach mehrmaliger Kontaktaufnahme nicht erreicht werden kann, erlischt der Anspruch auf den Gewinn und die JustRelate Group hat das Recht, einen Ersatzgewinner auszulosen. 
</br>
</br>
Die Teilnahme erfolgt unentgeltlich. Die Teilnahme ist unabhängig vom Erwerb von Leistungen und Services. Die JustRelate Group haftet nicht für etwaige Übertragungsfehler. Die JustRelate Group kann das Gewinnspiel ferner modifizieren, aussetzen oder beenden, soweit dies aufgrund höherer Gewalt oder äußerer, nicht von der JustRelate Group zu beeinflussende Umstände erforderlich sein sollte oder wenn nur so eine ordnungsgemäße Durchführung des Gewinnspiels gewährleistet werden kann. 
</br>
</br>
Der Gewinn wird nicht bar ausgezahlt. Jede Person darf nur einmal am Gewinnspiel teilnehmen. Die Teilnahme über automatisierte Massenteilnahmeverfahren Dritter ist unzulässig. Die Teilnahme ist während der DMEXCO vom 18. bis 19.09.2024 möglich. Die JustRelate Group behält sich das Recht vor, im Falle des Verdachts technischer Manipulation, Teilnehmer bei der Verlosung nicht zu berücksichtigen. 
</br>
</br>
Die geltende Datenschutzerklärung finden Sie unter <a target="_blank" href="https://www.iubenda.com/privacy-policy/26092085">https://www.iubenda.com/privacy-policy/26092085</a>. `;


Scrivito.provideComponent(FormCheckboxWidget, ({ widget }) => {
  const id = `form_checkbox_widget_${widget.id()}`;
  const [text, setText] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");

  const isCommercial = widget.get("isCommercial");
  const isGerman = widget.get("isGerman");

  React.useEffect(() => {
    if (isCommercial) {
      if (isGerman) {
        setText(
          'Ich bin mit der <a href="#" class="custom-link">werblichen Nutzung</a> meiner Adresse, E-Mail und Telefonnummer bis auf Widerruf einverstanden.'
        );
        setModalTitle("Werbliche Nutzung");
        setModalContent(commercialUseGermanText);
      } else {
        setText(
          'I agree to the <a href="#" class="custom-link">commercial use</a> of my address, email and telephone number until revoked.'
        );
        setModalTitle("Commercial use");
        setModalContent(commercialUseEnglishText);
      }
    } else {
      if (isGerman) {
        setText(
          'Ich bin mit den <a href="#" class="custom-link">Teilnahmebedingungen</a> einverstanden und möchte am Gewinnspiel teilnehmen.'
        );
        setModalTitle("Teilnahmebedingungen");
        setModalContent(participationGermanText);
      } else {
        setText(
          'I agree to the <a href="#" class="custom-link">conditions of participation</a> and would like to take part in the competition.'
        );
        setModalTitle("Conditions of participation");
        setModalContent(participationEnglishText);
      }
    }
  }, [isGerman, isCommercial]);

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // const clickedText = (event.target as HTMLElement).textContent;
    // setModalTitle(clickedText?.toUpperCase() || "Details");
    // setModalContent(
    //   `Here are more details about the ${clickedText || "item"}.`
    // );
    setShowModal(true);
  };

  return (
    <>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          id={id}
          type="checkbox"
          name={getFieldName(widget)}
          required={widget.get("required")}
        />
        <a target="_blank" ></a>
        <label className="form-check-label" htmlFor={id}>
          <span
            dangerouslySetInnerHTML={{ __html: text }}
            onClick={(e) => {
              if (
                e.target &&
                (e.target as HTMLElement).classList.contains("custom-link")
              ) {
                handleAnchorClick(
                  e as unknown as React.MouseEvent<HTMLAnchorElement>
                );
              }
            }}
          />
          {widget.get("required") && <Mandatory />}
          {widget.get("helpText") && <HelpText widget={widget} />}
        </label>
      </div>


      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} className="">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          dangerouslySetInnerHTML={{ __html: modalContent }}
        >
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {isGerman ? "Schließen" : "Close"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});
