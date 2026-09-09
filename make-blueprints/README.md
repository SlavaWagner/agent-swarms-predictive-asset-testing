# Make.com Blueprints: Agent Swarms for Predictive Asset Testing

Dieses Verzeichnis enthält den vorkonfigurierten **Make.com Blueprint** (Szenario), mit dem du die autonome Massen-Vorproduktion und das Predictive Asset Testing für Google Ads vollständig über Make AI Agents mit Google Gemini ausführen kannst.

---

## Enthaltene Blueprints

### `SWA Agent Swarms for Predictive Asset Testing (Asset Creation).blueprint.json`
* **Fokus**: Autonome Vorproduktion von Ad-Alternativen (RSAs & PMax Asset Groups) & 20-Agent Persona Swarm Testing
* **Funktion**:
  * Vollautomatisierte Angle-Discovery und Generierung von kardinalen Anzeigenalternativen mit Story-Spine & Buyer-Motivatoren
  * Prompting der multimodalen **Gemini AI Agents** zur Erstellung und Re-Vektorisierung von Text-Assets
  * Simulation des **20-Agent Persona Swarms** (dynamische Testkunden-Personas) zur qualitativen Bewertung und quantitativen Metriken-Prognose (CTR, CPC, CPM, CPL)
  * Automatisierte Einhaltung aller Zeichenbegrenzungen und Compliance-Filter (Headlines max. 30 Zeichen, Long Headlines max. 90 Zeichen, Descriptions max. 90 Zeichen)
  * Strukturierte Datenaufbereitung für den Export und die Bereitstellung in Google Ads

---

## Import-Anleitung in Make.com

1. **Neues Szenario erstellen**:
   * Öffne deinen Arbeitsbereich in [Make.com](https://www.make.com/).
   * Klicke oben rechts auf **Create a new scenario**.

2. **Blueprint importieren**:
   * Klicke in der unteren Steuerungsleiste auf die drei Punkte (`...` / *More options*).
   * Wähle **Import Blueprint**.
   * Wähle die Datei `SWA Agent Swarms for Predictive Asset Testing (Asset Creation).blueprint.json` aus diesem Verzeichnis aus.

3. **Verbindungen & Parameter konfigurieren**:
   * **Initial-Variablen anpassen**: Im ersten Modul (*Eingabe / Set Variables*) deine Parameter eintragen:
     * `email`: Deine Benachrichtigungsadresse
     * `customer_id`: Deine 10-stellige Google Ads Customer-ID
     * `Project`: Name des Werbeprojekts
     * `URL`: Ziel-Landingpage für Context-Scraping
   * **Google Ads Verbindung**: Authentifiziere deinen Google Ads Account bzw. Manager-Account (MCC) in den Google Ads Modulen.
   * **Gemini AI Verbindung**: Hinterlege deinen Google AI Studio / Gemini API Key in den entsprechenden Modulen für die Agent-Swarms.

4. **Testlauf & Aktivierung**:
   * Klicke auf **Run once**, um einen Testdurchlauf zu starten und die generierten Assets sowie das Swarm-Feedback zu überprüfen.
   * Aktiviere das Szenario oder richte einen automatisierten Zeitplan (Scheduling) ein.
