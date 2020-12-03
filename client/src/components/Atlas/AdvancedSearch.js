import React, { Component } from 'react';
import {Input, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Button} from "reactstrap";
import DeleteIcon from '../../static/images/delete.svg';
import Select from 'react-select';

const types = [
  {value: "small_airport", label: "Small Airport"},
  {value: "medium_airport", label: "Medium Airport"},
  {value: "large_airport", label: "Large Airport"},
  {value: "heliport", label: "Heliport"},
  {value: "balloonport", label: "Balloonport"},
  {value: "seaplane_base", label: "Seaplane Base"},
  {value: "closed", label: "Closed"},
]

const countries = [{value: "andorra", label: "Andorra"},{value: "united_arab_emirates", label: "United Arab Emirates"},{value: "afghanistan", label: "Afghanistan"},{value: "antigua_and_barbuda", label: "Antigua and Barbuda"},{value: "anguilla", label: "Anguilla"},{value: "albania", label: "Albania"},{value: "armenia", label: "Armenia"},{value: "angola", label: "Angola"},{value: "antarctica", label: "Antarctica"},{value: "argentina", label: "Argentina"},{value: "american_samoa", label: "American Samoa"},{value: "austria", label: "Austria"},{value: "australia", label: "Australia"},{value: "aruba", label: "Aruba"},{value: "azerbaijan", label: "Azerbaijan"},{value: "bosnia_and_herzegovina", label: "Bosnia and Herzegovina"},{value: "barbados", label: "Barbados"},{value: "bangladesh", label: "Bangladesh"},{value: "belgium", label: "Belgium"},{value: "burkina_faso", label: "Burkina Faso"},{value: "bulgaria", label: "Bulgaria"},{value: "bahrain", label: "Bahrain"},{value: "burundi", label: "Burundi"},{value: "benin", label: "Benin"},{value: "saint_barthélemy", label: "Saint Barthélemy"},{value: "bermuda", label: "Bermuda"},{value: "brunei", label: "Brunei"},{value: "bolivia", label: "Bolivia"},{value: "caribbean_netherlands", label: "Caribbean Netherlands"},{value: "brazil", label: "Brazil"},{value: "bahamas", label: "Bahamas"},{value: "bhutan", label: "Bhutan"},{value: "botswana", label: "Botswana"},{value: "belarus", label: "Belarus"},{value: "belize", label: "Belize"},{value: "canada", label: "Canada"},{value: "cocos_(keeling)_islands", label: "Cocos (Keeling) Islands"},{value: "congo_(kinshasa)", label: "Congo (Kinshasa)"},{value: "central_african_republic", label: "Central African Republic"},{value: "congo_(brazzaville)", label: "Congo (Brazzaville)"},{value: "switzerland", label: "Switzerland"},{value: "côte_d'ivoire", label: "Côte d'Ivoire"},{value: "cook_islands", label: "Cook Islands"},{value: "chile", label: "Chile"},{value: "cameroon", label: "Cameroon"},{value: "china", label: "China"},{value: "colombia", label: "Colombia"},{value: "costa_rica", label: "Costa Rica"},{value: "cuba", label: "Cuba"},{value: "cape_verde", label: "Cape Verde"},{value: "curaçao", label: "Curaçao"},{value: "christmas_island", label: "Christmas Island"},{value: "cyprus", label: "Cyprus"},{value: "czechia", label: "Czechia"},{value: "germany", label: "Germany"},{value: "djibouti", label: "Djibouti"},{value: "denmark", label: "Denmark"},{value: "dominica", label: "Dominica"},{value: "dominican_republic", label: "Dominican Republic"},{value: "algeria", label: "Algeria"},{value: "ecuador", label: "Ecuador"},{value: "estonia", label: "Estonia"},{value: "egypt", label: "Egypt"},{value: "western_sahara", label: "Western Sahara"},{value: "eritrea", label: "Eritrea"},{value: "spain", label: "Spain"},{value: "ethiopia", label: "Ethiopia"},{value: "finland", label: "Finland"},{value: "fiji", label: "Fiji"},{value: "falkland_islands", label: "Falkland Islands"},{value: "micronesia", label: "Micronesia"},{value: "faroe_islands", label: "Faroe Islands"},{value: "france", label: "France"},{value: "gabon", label: "Gabon"},{value: "united_kingdom", label: "United Kingdom"},{value: "grenada", label: "Grenada"},{value: "georgia", label: "Georgia"},{value: "french_guiana", label: "French Guiana"},{value: "guernsey", label: "Guernsey"},{value: "ghana", label: "Ghana"},{value: "gibraltar", label: "Gibraltar"},{value: "greenland", label: "Greenland"},{value: "gambia", label: "Gambia"},{value: "guinea", label: "Guinea"},{value: "guadeloupe", label: "Guadeloupe"},{value: "equatorial_guinea", label: "Equatorial Guinea"},{value: "greece", label: "Greece"},{value: "south_georgia_and_the_south_sandwich_islands", label: "South Georgia and the South Sandwich Islands"},{value: "guatemala", label: "Guatemala"},{value: "guam", label: "Guam"},{value: "guinea-bissau", label: "Guinea-Bissau"},{value: "guyana", label: "Guyana"},{value: "hong_kong", label: "Hong Kong"},{value: "honduras", label: "Honduras"},{value: "croatia", label: "Croatia"},{value: "haiti", label: "Haiti"},{value: "hungary", label: "Hungary"},{value: "indonesia", label: "Indonesia"},{value: "ireland", label: "Ireland"},{value: "israel", label: "Israel"},{value: "isle_of_man", label: "Isle of Man"},{value: "india", label: "India"},{value: "british_indian_ocean_territory", label: "British Indian Ocean Territory"},{value: "iraq", label: "Iraq"},{value: "iran", label: "Iran"},{value: "iceland", label: "Iceland"},{value: "italy", label: "Italy"},{value: "jersey", label: "Jersey"},{value: "jamaica", label: "Jamaica"},{value: "jordan", label: "Jordan"},{value: "japan", label: "Japan"},{value: "kenya", label: "Kenya"},{value: "kyrgyzstan", label: "Kyrgyzstan"},{value: "cambodia", label: "Cambodia"},{value: "kiribati", label: "Kiribati"},{value: "comoros", label: "Comoros"},{value: "saint_kitts_and_nevis", label: "Saint Kitts and Nevis"},{value: "north_korea", label: "North Korea"},{value: "south_korea", label: "South Korea"},{value: "kuwait", label: "Kuwait"},{value: "cayman_islands", label: "Cayman Islands"},{value: "kazakhstan", label: "Kazakhstan"},{value: "laos", label: "Laos"},{value: "lebanon", label: "Lebanon"},{value: "saint_lucia", label: "Saint Lucia"},{value: "liechtenstein", label: "Liechtenstein"},{value: "sri_lanka", label: "Sri Lanka"},{value: "liberia", label: "Liberia"},{value: "lesotho", label: "Lesotho"},{value: "lithuania", label: "Lithuania"},{value: "luxembourg", label: "Luxembourg"},{value: "latvia", label: "Latvia"},{value: "libya", label: "Libya"},{value: "morocco", label: "Morocco"},{value: "monaco", label: "Monaco"},{value: "moldova", label: "Moldova"},{value: "montenegro", label: "Montenegro"},{value: "saint_martin", label: "Saint Martin"},{value: "madagascar", label: "Madagascar"},{value: "marshall_islands", label: "Marshall Islands"},{value: "macedonia", label: "Macedonia"},{value: "mali", label: "Mali"},{value: "burma", label: "Burma"},{value: "mongolia", label: "Mongolia"},{value: "macau", label: "Macau"},{value: "northern_mariana_islands", label: "Northern Mariana Islands"},{value: "martinique", label: "Martinique"},{value: "mauritania", label: "Mauritania"},{value: "montserrat", label: "Montserrat"},{value: "malta", label: "Malta"},{value: "mauritius", label: "Mauritius"},{value: "maldives", label: "Maldives"},{value: "malawi", label: "Malawi"},{value: "mexico", label: "Mexico"},{value: "malaysia", label: "Malaysia"},{value: "mozambique", label: "Mozambique"},{value: "namibia", label: "Namibia"},{value: "new_caledonia", label: "New Caledonia"},{value: "niger", label: "Niger"},{value: "norfolk_island", label: "Norfolk Island"},{value: "nigeria", label: "Nigeria"},{value: "nicaragua", label: "Nicaragua"},{value: "netherlands", label: "Netherlands"},{value: "norway", label: "Norway"},{value: "nepal", label: "Nepal"},{value: "nauru", label: "Nauru"},{value: "niue", label: "Niue"},{value: "new_zealand", label: "New Zealand"},{value: "oman", label: "Oman"},{value: "panama", label: "Panama"},{value: "perú", label: "Perú"},{value: "french_polynesia", label: "French Polynesia"},{value: "papua_new_guinea", label: "Papua New Guinea"},{value: "philippines", label: "Philippines"},{value: "pakistan", label: "Pakistan"},{value: "poland", label: "Poland"},{value: "saint_pierre_and_miquelon", label: "Saint Pierre and Miquelon"},{value: "pitcairn", label: "Pitcairn"},{value: "puerto_rico", label: "Puerto Rico"},{value: "palestinian_territory", label: "Palestinian Territory"},{value: "portugal", label: "Portugal"},{value: "palau", label: "Palau"},{value: "paraguay", label: "Paraguay"},{value: "qatar", label: "Qatar"},{value: "réunion", label: "Réunion"},{value: "romania", label: "Romania"},{value: "serbia", label: "Serbia"},{value: "russia", label: "Russia"},{value: "rwanda", label: "Rwanda"},{value: "saudi_arabia", label: "Saudi Arabia"},{value: "solomon_islands", label: "Solomon Islands"},{value: "seychelles", label: "Seychelles"},{value: "sudan", label: "Sudan"},{value: "sweden", label: "Sweden"},{value: "singapore", label: "Singapore"},{value: "saint_helena", label: "Saint Helena"},{value: "slovenia", label: "Slovenia"},{value: "slovakia", label: "Slovakia"},{value: "sierra_leone", label: "Sierra Leone"},{value: "san_marino", label: "San Marino"},{value: "senegal", label: "Senegal"},{value: "somalia", label: "Somalia"},{value: "suriname", label: "Suriname"},{value: "south_sudan", label: "South Sudan"},{value: "são_tomé_and_principe", label: "São Tomé and Principe"},{value: "el_salvador", label: "El Salvador"},{value: "sint_maarten", label: "Sint Maarten"},{value: "syria", label: "Syria"},{value: "swaziland", label: "Swaziland"},{value: "turks_and_caicos_islands", label: "Turks and Caicos Islands"},{value: "chad", label: "Chad"},{value: "french_southern_territories", label: "French Southern Territories"},{value: "togo", label: "Togo"},{value: "thailand", label: "Thailand"},{value: "tajikistan", label: "Tajikistan"},{value: "tokelau", label: "Tokelau"},{value: "timor-leste", label: "Timor-Leste"},{value: "turkmenistan", label: "Turkmenistan"},{value: "tunisia", label: "Tunisia"},{value: "tonga", label: "Tonga"},{value: "turkey", label: "Turkey"},{value: "trinidad_and_tobago", label: "Trinidad and Tobago"},{value: "tuvalu", label: "Tuvalu"},{value: "taiwan", label: "Taiwan"},{value: "tanzania", label: "Tanzania"},{value: "ukraine", label: "Ukraine"},{value: "uganda", label: "Uganda"},{value: "united_states_minor_outlying_islands", label: "United States Minor Outlying Islands"},{value: "united_states", label: "United States"},{value: "uruguay", label: "Uruguay"},{value: "uzbekistan", label: "Uzbekistan"},{value: "vatican_city", label: "Vatican City"},{value: "saint_vincent_and_the_grenadines", label: "Saint Vincent and the Grenadines"},{value: "venezuela", label: "Venezuela"},{value: "british_virgin_islands", label: "British Virgin Islands"},{value: "u.s._virgin_islands", label: "U.S. Virgin Islands"},{value: "vietnam", label: "Vietnam"},{value: "vanuatu", label: "Vanuatu"},{value: "wallis_and_futuna", label: "Wallis and Futuna"},{value: "samoa", label: "Samoa"},{value: "kosovo", label: "Kosovo"},{value: "yemen", label: "Yemen"},{value: "mayotte", label: "Mayotte"},{value: "south_africa", label: "South Africa"},{value: "zambia", label: "Zambia"},{value: "zimbabwe", label: "Zimbabwe"},{value: "unknown_or_unassigned_country", label: "Unknown or unassigned country"}];
export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.updateAdvancedText = this.updateAdvancedText.bind(this);
    this.setCountries = this.setCountries.bind(this);
    this.setTypes = this.setTypes.bind(this);

    this.state = {
      advancedText: "",
      selectedCountries: [],
      selectedTypes: []
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader>Advanced Search</ModalHeader>
        <ModalBody>
          <InputGroup>
            <p className="w-100 pt-2 mb-0">Search Text</p>
            <Input placeholder="Search" value={this.state.advancedText} onChange={this.updateAdvancedText}/>
            <p className="w-100 pt-2 mb-0">Filter by Type</p>
            <Select
              isMulti
              onChange={this.setTypes}
              name="types"
              options={types}
              className="w-100"
            />
            <p className="w-100 pt-2 mb-0">Filter by Country</p>
            <Select
              isMulti
              onChange={this.setCountries}
              name="countries"
              options={countries}
              className="w-100"
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{if(this.state.advancedText !== "") {this.props.submit()}}}>Search</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  updateAdvancedText(event) {
    this.setState({advancedText: event.target.value});
    this.props.updateAdvancedText(event.target.value);
  }

  setCountries = (selectedOptions) => {
    let temp = []
    for (let i = 0; i < selectedOptions.length; i++) {
      temp.push(selectedOptions[i].value);
    }
    this.setState({selectedCountries: temp}, this.sendCountries);
  }

  setTypes = (selectedOptions) => {
    let temp = []
    for (let i = 0; i < selectedOptions.length; i++) {
      temp.push(selectedOptions[i].value);
    }
    this.setState({selectedTypes: temp}, this.sendTypes);
  }

  sendCountries() {
    this.props.setWhere(this.state.selectedCountries);
  }

  sendTypes() {
    this.props.setType(this.state.selectedTypes);
  }
}