<!-- src/components/TermsOfService.vue -->
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white text-gray-800 rounded-lg w-11/12 md:w-4/5 lg:w-3/4 max-h-screen overflow-y-auto p-8 relative shadow-lg">
      
      <!-- Header -->
      <h2 class="text-3xl font-bold mb-6 text-center">Algemene Voorwaarden</h2>
      
      <!-- Content -->
      <div class="space-y-6 text-lg leading-relaxed">
        <p>
          Welkom bij SoulConnect. Door toegang te krijgen tot of gebruik te maken van onze webapplicatie en diensten, gaat u akkoord met deze Algemene Voorwaarden. Indien u niet akkoord gaat met deze voorwaarden, verzoeken wij u geen gebruik te maken van onze diensten. Deze Algemene Voorwaarden zijn van toepassing op alle gebruikers van de diensten, ongeacht hun nationaliteit of woonplaats. Door gebruik te maken van onze diensten erkent u dat u deze voorwaarden hebt gelezen, begrepen en ermee akkoord gaat. SoulConnect, gevestigd te Amsterdam, 1011 AB, Nederland, geregistreerd bij de Kamer van Koophandel onder nummer 12345678 en met BTW-nummer NL123456789B01, is de eigenaar van deze webapplicatie. U kunt contact met ons opnemen via <a href="mailto:info@soulconnect.nl" class="text-blue-600 hover:underline">info@soulconnect.nl</a> of +31 20 123 4567.
        </p>

        <p>
          Onze diensten zijn beschikbaar voor iedereen die de leeftijd van meerderjarigheid heeft bereikt en in staat is juridische verplichtingen aan te gaan. U stemt ermee in de diensten niet te gebruiken voor illegale doeleinden of op een manier die de werking van de diensten kan verstoren. Voor toegang tot bepaalde functies van de diensten moet u een account aanmaken door het verstrekken van accurate en volledige informatie. U bent verantwoordelijk voor het handhaven van de vertrouwelijkheid van uw accountgegevens en voor alle activiteiten die plaatsvinden onder uw account.
        </p>

        <p>
          Wij bieden diverse matchmaking- en sociale interactiediensten. Alle prijzen zijn exclusief BTW, tenzij anders vermeld. Betalingen dienen te geschieden via de door ons aangeboden betaalmethoden. Wij streven ernaar om de diensten te leveren volgens de gespecificeerde tijdschema's, maar garanderen geen specifieke levertijden. Indien van toepassing, heeft de gebruiker het recht om binnen de wettelijk vastgestelde termijn de diensten te annuleren.
        </p>

        <p>
          Alle intellectuele eigendomsrechten met betrekking tot de diensten en de content berusten bij ons of onze licentiegevers. Gebruikers mogen de content uitsluitend gebruiken voor persoonlijk en niet-commercieel gebruik, tenzij anders overeengekomen. Wij respecteren uw privacy en behandelen uw persoonsgegevens in overeenstemming met ons <a href="/privacybeleid" class="text-blue-600 hover:underline">Privacybeleid</a>. Door gebruik te maken van onze diensten, stemt u in met de verzameling en verwerking van uw gegevens zoals beschreven in het Privacybeleid.
        </p>

        <p>
          Wij zijn niet aansprakelijk voor enige directe, indirecte, incidentele, speciale of gevolgschade die voortvloeit uit uw gebruik van of onvermogen om de diensten te gebruiken, zelfs indien wij op de hoogte zijn gesteld van de mogelijkheid van dergelijke schade. Wij zijn niet aansprakelijk voor vertragingen of tekortkomingen in de uitvoering van onze verplichtingen als gevolg van oorzaken buiten onze redelijke controle, waaronder natuurrampen, oorlog, stakingen of technische storingen.
        </p>

        <p>
          Eventuele geschillen voortvloeiend uit of in verband met deze voorwaarden zullen eerst middels onderhandelingen worden opgelost. Indien geen oplossing wordt bereikt, zal het geschil worden voorgelegd aan de bevoegde rechter in Amsterdam, Nederland. Op deze voorwaarden is het recht van Nederland van toepassing.
        </p>

        <p>
          Wij behouden ons het recht voor om deze voorwaarden te wijzigen. Wijzigingen worden van kracht zodra ze op de diensten zijn gepubliceerd. Het is uw verantwoordelijkheid om regelmatig de voorwaarden te controleren op wijzigingen. Door voortgezet gebruik van de diensten na publicatie van wijzigingen, stemt u in met de aangepaste voorwaarden. Wij behouden ons het recht voor om uw toegang tot de diensten te beëindigen of te beperken, zonder voorafgaande kennisgeving, indien u deze voorwaarden schendt of indien wij van mening zijn dat uw gebruik van de diensten schadelijk is voor ons of andere gebruikers.
        </p>

        <p>
          Voor vragen of opmerkingen over deze voorwaarden kunt u contact met ons opnemen via <a href="mailto:info@soulconnect.nl" class="text-blue-600 hover:underline">info@soulconnect.nl</a>, +31 20 123 4567 of ons adres te Amsterdam, 1011 AB, Nederland. Indien een bepaling van deze voorwaarden ongeldig of onafdwingbaar wordt bevonden, blijven de overige bepalingen volledig van kracht.
        </p>

        <p>
          Deze Algemene Voorwaarden zijn een voorbeeld en dienen alleen ter illustratie. Het is van cruciaal belang dat u deze voorwaarden laat controleren en aanpassen door een gekwalificeerde jurist om ervoor te zorgen dat ze volledig voldoen aan de toepasselijke wet- en regelgeving en specifiek zijn afgestemd op uw webapplicatie en bedrijfsvoering.
        </p>

        <!-- sluit knop -->
        <div class="flex  mt-8">
          <button
            @click="close"
            class="px-6 py-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-colors duration-200"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.transition-enter-active,
.transition-leave-active {
  transition: opacity 0.3s;
}
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
}
</style>
