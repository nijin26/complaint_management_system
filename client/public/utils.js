export const complaintType = [
  "Consumer complaints",

  "Police complaints",

  "Landlord-tenant complaints",
  "Employment complaints",
  "Traffic complaints",
  "Corruption complaints",
  "Tax complaints",
  "Education complaints",
  "Medical complaints",
  "Banking and finance complaints",
  "Electricity complaints",
  "Environmental complaints",
  "Telecommunications complaints",
  "Insurance complaints",
  "Housing complaints",
  "Cybercrime complaints",
  "Missing person cases",
  "Domestic violence complaints",
];

export const districts = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];

export const getPoliceStation = (sector) => {
  const sectorDetails = policeStations.find((s) => s.sector === sector);
  return sectorDetails ? sectorDetails.stations : [];
};

export const stationSectors = [
  "Thiruvananthapuram city",
  "Thiruvananthapuram rural",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Kochi City",
  "Ernakulam Rural",
  "Thrissur City",
  "Thrissur Rural",
  "Palakkad",
  "Malappuram",
  "Kozhikode City",
  "Kozhikode Rural",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

const policeStations = [
  {
    sector: "Thiruvananthapuram city",
    stations: [
      {
        stationID: "TVMC_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0471-2329107",
      },
      {
        stationID: "TVMC_PoliceControlRoom",
        stationName: "Police Control Room",
        phoneNumber: "0471-2333100",
      },
      {
        stationID: "TVMC_TrafficHelpline",
        stationName: "Traffic Helpline",
        phoneNumber: "0471-1099",
      },
      {
        stationID: "TVMC_TrafficPSSI1",
        stationName: "Traffic PS SI-1",
        phoneNumber: "0471-2558731",
      },
      {
        stationID: "TVMC_CantonmentPS",
        stationName: "Cantonment PS",
        phoneNumber: "0471-2330248",
      },
      {
        stationID: "TVMC_VanithaPSWSI1",
        stationName: "Vanitha PS WSI-1",
        phoneNumber: "0471-2321555",
      },
      {
        stationID: "TVMC_MuseumPS",
        stationName: "Museum PS",
        phoneNumber: "0471-2315096",
      },
      {
        stationID: "TVMC_PoojappuraPS",
        stationName: "Poojappura PS",
        phoneNumber: "0471-2350266",
      },
      {
        stationID: "TVMC_PeroorkadaPS",
        stationName: "Peroorkada PS",
        phoneNumber: "0471-2433243",
      },
      {
        stationID: "TVMC_VattiyoorkavuPS",
        stationName: "Vattiyoorkavu PS",
        phoneNumber: "0471-2360690",
      },
      {
        stationID: "TVMC_PoonthuraPS",
        stationName: "Poonthura PS",
        phoneNumber: "0471-2380729",
      },
      {
        stationID: "TVMC_ValiyathuraPS",
        stationName: "Valiyathura PS",
        phoneNumber: "0471-2501833",
      },
      {
        stationID: "TVMC_PettahPS",
        stationName: "Pettah PS",
        phoneNumber: "0471-2743195",
      },
      {
        stationID: "TVMC_VanchiyoorPS",
        stationName: "Vanchiyoor PS",
        phoneNumber: "0471-2461129",
      },
      {
        stationID: "TVMC_MedicalCollegePS",
        stationName: "Medical College PS",
        phoneNumber: "0471-2443145",
      },
      {
        stationID: "TVMC_ThumbaPS",
        stationName: "Thumba PS",
        phoneNumber: "0471-2563754",
      },
      {
        stationID: "TVMC_SreekariyamPS",
        stationName: "Sreekariyam PS",
        phoneNumber: "0471-2592100",
      },
      {
        stationID: "TVMC_FortPS",
        stationName: "Fort PS",
        phoneNumber: "0471-2461105",
      },
      {
        stationID: "TVMC_ThampanoorPS",
        stationName: "Thampanoor PS",
        phoneNumber: "0471-2326543",
      },
      {
        stationID: "TVMC_KaramanaPS",
        stationName: "Karamana PS",
        phoneNumber: "0471-2343534",
      },
      {
        stationID: "TVMC_NemomPS",
        stationName: "Nemom PS",
        phoneNumber: "0471-2390223",
      },
      {
        stationID: "TVMC_ThiruvallamPS",
        stationName: "Thiruvallam PS",
        phoneNumber: "0471-2381148",
      },
      {
        stationID: "TVMC_VizhinjamPS",
        stationName: "Vizhinjam PS",
        phoneNumber: "0471-2480245",
      },
      {
        stationID: "TVMC_KovalamPS",
        stationName: "Kovalam PS",
        phoneNumber: "0471-2480255",
      },
    ],
  },
  {
    sector: "Thiruvananthapuram rural",
    stations: [
      {
        stationID: "TVMR_SIAttingalTraffic",
        stationName: "SI Attingal Traffic",
        phoneNumber: "0470-2622444",
      },
      {
        stationID: "TVMR_AttingalPS",
        stationName: "Attingal PS",
        phoneNumber: "0470-2622444",
      },
      {
        stationID: "TVMR_ChirayinkeezhuPS",
        stationName: "Chirayinkeezhu PS",
        phoneNumber: "0470-2640380",
      },
      {
        stationID: "TVMR_VarkalaPS",
        stationName: "Varkala PS",
        phoneNumber: "0470-2602333",
      },
      {
        stationID: "TVMR_KallambalamPS",
        stationName: "Kallambalam PS",
        phoneNumber: "0470-2692066",
      },
      {
        stationID: "TVMR_KadakkavoorPS",
        stationName: "Kadakkavoor PS",
        phoneNumber: "0470-2656629",
      },
      {
        stationID: "TVMR_AnchuthenguPS",
        stationName: "Anchuthengu PS",
        phoneNumber: "0470-2656641",
      },
      {
        stationID: "TVMR_KazhakkuttomPS",
        stationName: "Kazhakkuttom PS",
        phoneNumber: "0471-2418231",
      },
      {
        stationID: "TVMR_KadinamkulamPS",
        stationName: "Kadinamkulam PS",
        phoneNumber: "0471-2750265",
      },
      {
        stationID: "TVMR_MangalapuramPS",
        stationName: "Mangalapuram PS",
        phoneNumber: "0471-2420275",
      },
      {
        stationID: "TVMR_PothencodePS",
        stationName: "Pothencode PS",
        phoneNumber: "0471-2716100",
      },
      {
        stationID: "TVMR_VenjaramooduPS",
        stationName: "Venjaramoodu PS",
        phoneNumber: "0472-2872023",
      },
      {
        stationID: "TVMR_VattapparaPS",
        stationName: "Vattappara PS",
        phoneNumber: "0472-2585055",
      },
      {
        stationID: "TVMR_KilimanoorPS",
        stationName: "Kilimanoor PS",
        phoneNumber: "0470-2672226",
      },
      {
        stationID: "TVMR_PallickalPS",
        stationName: "Pallickal PS",
        phoneNumber: "0470-2682026",
      },
      {
        stationID: "TVMR_PangodePS",
        stationName: "Pangode PS",
        phoneNumber: "0472-2869223",
      },
      {
        stationID: "TVMR_NedumangadPS",
        stationName: "Nedumangad PS",
        phoneNumber: "0472-2802400",
      },
      {
        stationID: "TVMR_ValiyamalaPS",
        stationName: "Valiyamala PS",
        phoneNumber: "0471-2879100",
      },
      {
        stationID: "TVMR_AryanadPS",
        stationName: "Aryanad PS",
        phoneNumber: "0472-2852033",
      },
      {
        stationID: "TVMR_VilappilssalaPS",
        stationName: "Vilappilssala PS",
        phoneNumber: "0471-2289060",
      },
      {
        stationID: "TVMR_PalodePS",
        stationName: "Palode PS",
        phoneNumber: "0472-2840260",
      },
      {
        stationID: "TVMR_VithuraPS",
        stationName: "Vithura PS",
        phoneNumber: "0472-2856243",
      },
      {
        stationID: "TVMR_PonmudiPS",
        stationName: "Ponmudi PS",
        phoneNumber: "0472-2890222",
      },
      {
        stationID: "TVMR_KattakadaPS",
        stationName: "Kattakada PS",
        phoneNumber: "0471-2290223",
      },
      {
        stationID: "TVMR_MalayinkeezhPS",
        stationName: "Malayinkeezh PS",
        phoneNumber: "0471-2282023",
      },
      {
        stationID: "TVMR_NeyyardamPS",
        stationName: "Neyyardam PS",
        phoneNumber: "0471-2272266",
      },
      {
        stationID: "TVMR_MaranallorPS",
        stationName: "Maranallor PS",
        phoneNumber: "0471-2299100",
      },
      {
        stationID: "TVMR_NeyyattinkaraPSSI",
        stationName: "Neyyattinkara PS SI",
        phoneNumber: "0471-2222222",
      },
      {
        stationID: "TVMR_VellaradaPS",
        stationName: "Vellarada PS",
        phoneNumber: "0471-2242023",
      },
      {
        stationID: "TVMR_AryancodePS",
        stationName: "Aryancode PS",
        phoneNumber: "0471-2256223",
      },
      {
        stationID: "TVMR_BalaramapuramPS",
        stationName: "Balaramapuram PS",
        phoneNumber: "0471-2400366",
      },
      {
        stationID: "TVMR_PoovarPS",
        stationName: "Poovar PS",
        phoneNumber: "0471-2211100",
      },
      {
        stationID: "TVMR_KanjiramkulamPS",
        stationName: "Kanjiramkulam PS",
        phoneNumber: "0471-2261100",
      },
      {
        stationID: "TVMR_ParassalaPS",
        stationName: "Parassala PS",
        phoneNumber: "0471-2202023",
      },
      {
        stationID: "TVMR_PozhiyoorPS",
        stationName: "Pozhiyoor PS",
        phoneNumber: "0471-2212100",
      },
    ],
  },
  {
    sector: "Kollam",
    stations: [
      {
        stationID: "Kollam_CrimeStopper",
        stationName: "Crime stopper",
        phoneNumber: "0474-2763694",
      },
      {
        stationID: "Kollam_ControlRoom",
        stationName: "Control Room",
        phoneNumber: "0474-100",
      },
      {
        stationID: "Kollam_DistrictControl",
        stationName: "Kollam District Control",
        phoneNumber: "0474-2746000",
      },
      {
        stationID: "Kollam_KollamEastPS",
        stationName: "Kollam East PS",
        phoneNumber: "0474-2742072",
      },
      {
        stationID: "Kollam_EravipuramPS",
        stationName: "Eravipuram PS",
        phoneNumber: "0474-2723626",
      },
      {
        stationID: "Kollam_KilikolloorPS",
        stationName: "Kilikolloor PS",
        phoneNumber: "0474-2711155",
      },
      {
        stationID: "Kollam_KollamWestPS",
        stationName: "Kollam West PS",
        phoneNumber: "0474-2795086",
      },
      {
        stationID: "Kollam_AnchalummooduPS",
        stationName: "Anchalummoodu PS",
        phoneNumber: "0474-2552682",
      },
      {
        stationID: "Kollam_SakthikulangaraPS",
        stationName: "Sakthikulangara PS",
        phoneNumber: "0474-2770966",
      },
      {
        stationID: "Kollam_CICoastalPSNeendakara",
        stationName: "CI Coastal PS, Neendakara",
        phoneNumber: "0476-2685200",
      },
      {
        stationID: "Kollam_CoastalPSNeendakara",
        stationName: "Coastal PS, Neendakara",
        phoneNumber: "0476-2685095",
      },
      {
        stationID: "Kollam_PuthenthuraPS",
        stationName: "Puthenthura PS",
        phoneNumber: "0474-2404565",
      },
      {
        stationID: "Kollam_MayyanadPS",
        stationName: "Mayyanad PS",
        phoneNumber: "0474-2552180",
      },
      {
        stationID: "Kollam_CIPSKundara",
        stationName: "CI PS, Kundara",
        phoneNumber: "0474-2522224",
      },
      {
        stationID: "Kollam_KundaraPS",
        stationName: "Kundara PS",
        phoneNumber: "0474-2522224",
      },
      {
        stationID: "Kollam_CIPSKarunagappally",
        stationName: "CI PS, Karunagappally",
        phoneNumber: "0476-2620451",
      },
      {
        stationID: "Kollam_KarunagappallyPS",
        stationName: "Karunagappally PS",
        phoneNumber: "0476-2620237",
      },
      {
        stationID: "Kollam_OachiraPS",
        stationName: "Oachira PS",
        phoneNumber: "0476-2690016",
      },
      {
        stationID: "Kollam_ChavaraPS",
        stationName: "Chavara PS",
        phoneNumber: "0476-2689288",
      },
      {
        stationID: "Kollam_CIPSKottarakkara",
        stationName: "CI PS, Kottarakkara",
        phoneNumber: "0474-2451006",
      },
      {
        stationID: "Kollam_KottarakkaraPS",
        stationName: "Kottarakkara PS",
        phoneNumber: "0474-2451006",
      },
      {
        stationID: "Kollam_CIPSKottiyam",
        stationName: "CI PS, Kottiyam",
        phoneNumber: "0474-2532424",
      },
      {
        stationID: "Kollam_KottiyamPS",
        stationName: "Kottiyam PS",
        phoneNumber: "0474-2532424",
      },
      {
        stationID: "Kollam_CIPSAnchal",
        stationName: "CI PS, Anchal",
        phoneNumber: "0475-2274222",
      },
      {
        stationID: "Kollam_AnchalPS",
        stationName: "Anchal PS",
        phoneNumber: "0475-2274222",
      },
      {
        stationID: "Kollam_CIPSPunalur",
        stationName: "CI PS, Punalur",
        phoneNumber: "0475-2222222",
      },
      {
        stationID: "Kollam_PunalurPS",
        stationName: "Punalur PS",
        phoneNumber: "0475-2222222",
      },
      {
        stationID: "Kollam_PathanapuramPS",
        stationName: "Pathanapuram PS",
        phoneNumber: "0475-2352222",
      },
    ],
  },
  {
    sector: "Pathanamthitta",
    stations: [
      {
        stationID: "Pathanamthitta_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0468-2222007",
      },
      {
        stationID: "Pathanamthitta_ControlRoom",
        stationName: "Control Room",
        phoneNumber: "0468-2222222",
      },
      {
        stationID: "Pathanamthitta_DistrictControl",
        stationName: "Pathanamthitta District Control",
        phoneNumber: "0468-2222222",
      },
      {
        stationID: "Pathanamthitta_PathanamthittaPS",
        stationName: "Pathanamthitta PS",
        phoneNumber: "0468-2222222",
      },
      {
        stationID: "Pathanamthitta_AdoorPS",
        stationName: "Adoor PS",
        phoneNumber: "0473-4222222",
      },
      {
        stationID: "Pathanamthitta_KozhencherryPS",
        stationName: "Kozhencherry PS",
        phoneNumber: "0468-2312222",
      },
      {
        stationID: "Pathanamthitta_RanniPS",
        stationName: "Ranni PS",
        phoneNumber: "0473-5252222",
      },
      {
        stationID: "Pathanamthitta_KonniPS",
        stationName: "Konni PS",
        phoneNumber: "0468-2242222",
      },
      {
        stationID: "Pathanamthitta_KakkiPS",
        stationName: "Kakki PS",
        phoneNumber: "0469-2662250",
      },
      {
        stationID: "Pathanamthitta_VazhamuttamPS",
        stationName: "Vazhamuttam PS",
        phoneNumber: "0468-2272222",
      },
      {
        stationID: "Pathanamthitta_KalanjoorPS",
        stationName: "Kalanjoor PS",
        phoneNumber: "0468-2352222",
      },
      {
        stationID: "Pathanamthitta_ThiruvallaPS",
        stationName: "Thiruvalla PS",
        phoneNumber: "0469-2602222",
      },
      {
        stationID: "Pathanamthitta_PerunadPS",
        stationName: "Perunad PS",
        phoneNumber: "0468-2322222",
      },
      {
        stationID: "Pathanamthitta_RanniPerumthenaruviPS",
        stationName: "Ranni-Perumthenaruvi PS",
        phoneNumber: "0473-5252222",
      },
      {
        stationID: "Pathanamthitta_ThadiyoorPS",
        stationName: "Thadiyoor PS",
        phoneNumber: "0469-2692222",
      },
      {
        stationID: "Pathanamthitta_MallappallyPS",
        stationName: "Mallappally PS",
        phoneNumber: "0469-2682222",
      },
      {
        stationID: "Pathanamthitta_PandalamPS",
        stationName: "Pandalam PS",
        phoneNumber: "0468-2222222",
      },
    ],
  },
  {
    sector: "ALAPPUZHA ()",
    stations: [
      {
        stationID: "ALAPPUZHA_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0477-1090",
      },
      {
        stationID: "ALAPPUZHA_AlappuzhaSouthPS",
        stationName: "Alappuzha South PS",
        phoneNumber: "0477-2239343",
      },
      {
        stationID: "ALAPPUZHA_PunnapraPS",
        stationName: "Punnapra PS",
        phoneNumber: "0477-2287669",
      },
      {
        stationID: "ALAPPUZHA_TrafficPS",
        stationName: "Traffic PS",
        phoneNumber: "0477-2230246",
      },
      {
        stationID: "ALAPPUZHA_NorthPS",
        stationName: "North PS",
        phoneNumber: "0477-2245541",
      },
      {
        stationID: "ALAPPUZHA_AmbalappuzhaPS",
        stationName: "Ambalappuzha PS",
        phoneNumber: "0477-2272022",
      },
      {
        stationID: "ALAPPUZHA_NedumudyPS",
        stationName: "Nedumudy PS",
        phoneNumber: "0477-2762222",
      },
      {
        stationID: "ALAPPUZHA_PulinkunnuPS",
        stationName: "Pulinkunnu PS",
        phoneNumber: "0477-2702222",
      },
      {
        stationID: "ALAPPUZHA_RamankaryPS",
        stationName: "Ramankary PS",
        phoneNumber: "0477-2705532",
      },
      {
        stationID: "ALAPPUZHA_KainadyPS",
        stationName: "Kainady PS",
        phoneNumber: "0477-2747242",
      },
      {
        stationID: "ALAPPUZHA_CherthalaPS",
        stationName: "Cherthala PS",
        phoneNumber: "0478-2813205",
      },
      {
        stationID: "ALAPPUZHA_PoochakkalPS",
        stationName: "Poochakkal PS",
        phoneNumber: "0478-2522249",
      },
      {
        stationID: "ALAPPUZHA_KuthiathodePS",
        stationName: "Kuthiathode PS",
        phoneNumber: "0478-2562239",
      },
      {
        stationID: "ALAPPUZHA_AroorPS",
        stationName: "Aroor PS",
        phoneNumber: "0478-2872044",
      },
      {
        stationID: "ALAPPUZHA_PattanakkadPS",
        stationName: "Pattanakkad PS",
        phoneNumber: "0478-2592210",
      },
      {
        stationID: "ALAPPUZHA_MararikulamPS",
        stationName: "Mararikulam PS",
        phoneNumber: "0478-2862391",
      },
      {
        stationID: "ALAPPUZHA_MuhammaPS",
        stationName: "Muhamma PS",
        phoneNumber: "0478-2862331",
      },
      {
        stationID: "ALAPPUZHA_ArthungalPS",
        stationName: "Arthungal PS",
        phoneNumber: "0478-2572233",
      },
      {
        stationID: "ALAPPUZHA_ChengannoorPS",
        stationName: "Chengannoor PS",
        phoneNumber: "0479-2452226",
      },
      {
        stationID: "ALAPPUZHA_VenmaniPS",
        stationName: "Venmani PS",
        phoneNumber: "0479-2352202",
      },
      {
        stationID: "ALAPPUZHA_MannarPS",
        stationName: "Mannar PS",
        phoneNumber: "0479-2312224",
      },
      {
        stationID: "ALAPPUZHA_EdathuaPS",
        stationName: "Edathua PS",
        phoneNumber: "0477-2212237",
      },
      {
        stationID: "ALAPPUZHA_VeeyapuramPS",
        stationName: "Veeyapuram PS",
        phoneNumber: "0479-2319711",
      },
      {
        stationID: "ALAPPUZHA_MavelikkaraPS",
        stationName: "Mavelikkara PS",
        phoneNumber: "0479-2302238",
      },
      {
        stationID: "ALAPPUZHA_KurathikaduPS",
        stationName: "Kurathikadu PS",
        phoneNumber: "0479-2333500",
      },
      {
        stationID: "ALAPPUZHA_VallikunnamPS",
        stationName: "Vallikunnam PS",
        phoneNumber: "0479-2335240",
      },
      {
        stationID: "ALAPPUZHA_NooranaduPS",
        stationName: "Nooranadu PS",
        phoneNumber: "0479-2386344",
      },
      {
        stationID: "ALAPPUZHA_KayamkulamPS",
        stationName: "Kayamkulam PS",
        phoneNumber: "0479-2445929",
      },
      {
        stationID: "ALAPPUZHA_KanakakunnuPS",
        stationName: "Kanakakunnu PS",
        phoneNumber: "0479-2430629",
      },
      {
        stationID: "ALAPPUZHA_KareelakulangaraPS",
        stationName: "Kareelakulangara PS",
        phoneNumber: "0479-2472011",
      },
      {
        stationID: "ALAPPUZHA_HarippadPS",
        stationName: "Harippad PS",
        phoneNumber: "0479-2412626",
      },
      {
        stationID: "ALAPPUZHA_ThrikkunnappuzhaPS",
        stationName: "Thrikkunnappuzha PS",
        phoneNumber: "0479-2482026",
      },
    ],
  },
  {
    sector: "KOTTAYAM ()",
    stations: [
      {
        stationID: "KOTTAYAM_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0481-2564028",
      },
      {
        stationID: "KOTTAYAM_KottayamEastPS",
        stationName: "Kottayam East PS",
        phoneNumber: "0481-2560333",
      },
      {
        stationID: "KOTTAYAM_AyarkunnamPS",
        stationName: "Ayarkunnam PS",
        phoneNumber: "0481-2546660",
      },
      {
        stationID: "KOTTAYAM_GandhinagarPS",
        stationName: "Gandhinagar PS",
        phoneNumber: "0481-2597210",
      },
      {
        stationID: "KOTTAYAM_TrafficPS",
        stationName: "Traffic PS",
        phoneNumber: "0481-2581578",
      },
      {
        stationID: "KOTTAYAM_KottayamWestPS",
        stationName: "Kottayam West PS",
        phoneNumber: "0481-2567210",
      },
      {
        stationID: "KOTTAYAM_KumarakomPS",
        stationName: "Kumarakom PS",
        phoneNumber: "0481-2524339",
      },
      {
        stationID: "KOTTAYAM_ChanganasseryPS",
        stationName: "Changanassery PS",
        phoneNumber: "0481-2420100",
      },
      {
        stationID: "KOTTAYAM_ThrikkodithanamPS",
        stationName: "Thrikkodithanam PS",
        phoneNumber: "0481-2440200",
      },
      {
        stationID: "KOTTAYAM_VakathanamPS",
        stationName: "Vakathanam PS",
        phoneNumber: "0481-2462296",
      },
      {
        stationID: "KOTTAYAM_ChingavanamPS",
        stationName: "Chingavanam PS",
        phoneNumber: "0481-2430587",
      },
      {
        stationID: "KOTTAYAM_KarukachalPS",
        stationName: "Karukachal PS",
        phoneNumber: "0481-2485126",
      },
      {
        stationID: "KOTTAYAM_EttumanoorPS",
        stationName: "Ettumanoor PS",
        phoneNumber: "0481-2535517",
      },
      {
        stationID: "KOTTAYAM_KuravilangaduPS",
        stationName: "Kuravilangadu PS",
        phoneNumber: "0482-2230323",
      },
      {
        stationID: "KOTTAYAM_KanjirappallyPS",
        stationName: "Kanjirappally PS",
        phoneNumber: "04828-202800",
      },
      {
        stationID: "KOTTAYAM_MundakkayamPS",
        stationName: "Mundakkayam PS",
        phoneNumber: "04828-272317",
      },
      {
        stationID: "KOTTAYAM_PonkunnamPS",
        stationName: "Ponkunnam PS",
        phoneNumber: "04828-221240",
      },
      {
        stationID: "KOTTAYAM_PallikkathodePS",
        stationName: "Pallikkathode PS",
        phoneNumber: "0481-2551066",
      },
      {
        stationID: "KOTTAYAM_ManimalaPS",
        stationName: "Manimala PS",
        phoneNumber: "04828-247141",
      },
      {
        stationID: "KOTTAYAM_ErumeliPS",
        stationName: "Erumeli PS",
        phoneNumber: "04828-210233",
      },
      {
        stationID: "KOTTAYAM_PampadyPS",
        stationName: "Pampady PS",
        phoneNumber: "0481-2505322",
      },
      {
        stationID: "KOTTAYAM_ManarcaudPS",
        stationName: "Manarcaud PS",
        phoneNumber: "0481-2370288",
      },
      {
        stationID: "KOTTAYAM_PalaPS",
        stationName: "Pala PS",
        phoneNumber: "0482-2212334",
      },
      {
        stationID: "KOTTAYAM_VaikkomPS",
        stationName: "Vaikkom PS",
        phoneNumber: "04829-231330",
      },
      {
        stationID: "KOTTAYAM_KidangoorPS",
        stationName: "Kidangoor PS",
        phoneNumber: "04822-254195",
      },
      {
        stationID: "KOTTAYAM_KaduthuruthyPS",
        stationName: "Kaduthuruthy PS",
        phoneNumber: "04829-282323",
      },
      {
        stationID: "KOTTAYAM_VelloorPS",
        stationName: "Velloor PS",
        phoneNumber: "04829-257160",
      },
      {
        stationID: "KOTTAYAM_RamapuramPS",
        stationName: "Ramapuram PS",
        phoneNumber: "04822-260252",
      },
      {
        stationID: "KOTTAYAM_MarangattupallyPS",
        stationName: "Marangattupally PS",
        phoneNumber: "04822-251065",
      },
      {
        stationID: "KOTTAYAM_ErattupettahPS",
        stationName: "Erattupettah PS",
        phoneNumber: "04822-272228",
      },
      {
        stationID: "KOTTAYAM_MelukkavuPS",
        stationName: "Melukkavu PS",
        phoneNumber: "04822-219058",
      },
      {
        stationID: "KOTTAYAM_ThidanaduPS",
        stationName: "Thidanadu PS",
        phoneNumber: "04822-235295",
      },
    ],
  },
  {
    sector: "Kochi City",
    stations: [
      {
        stationID: "Kochi_ControlRoom",
        stationName: "Control Room",
        phoneNumber: "0484-2366100",
      },
      {
        stationID: "Kochi_TrafficPSWest",
        stationName: "Traffic PS West",
        phoneNumber: "0484-2394218",
      },
      {
        stationID: "Kochi_TrafficPSEast",
        stationName: "Traffic PS East",
        phoneNumber: "0484-2344852",
      },
      {
        stationID: "Kochi_ErnakulamCentralPS",
        stationName: "Ernakulam Central PS",
        phoneNumber: "0484-2394500",
      },
      {
        stationID: "Kochi_VanithaPS",
        stationName: "Vanitha PS",
        phoneNumber: "0484-2394250",
      },
      {
        stationID: "Kochi_MulavukadPS",
        stationName: "Mulavukad PS",
        phoneNumber: "0484-2750772",
      },
      {
        stationID: "Kochi_KadavantharaPS",
        stationName: "Kadavanthara PS",
        phoneNumber: "0484-2207855",
      },
      {
        stationID: "Kochi_ErnakulamNorthPS",
        stationName: "Ernakulam North (Kasba) PS",
        phoneNumber: "0484-2390280",
      },
      {
        stationID: "Kochi_PalarivattomPS",
        stationName: "Palarivattom PS",
        phoneNumber: "0484-2345850",
      },
      {
        stationID: "Kochi_EloorPS",
        stationName: "Eloor PS",
        phoneNumber: "0484-2546365",
      },
      {
        stationID: "Kochi_CheranalloorPS",
        stationName: "Cheranalloor PS",
        phoneNumber: "0484-2430227",
      },
      {
        stationID: "Kochi_MattancherryPS",
        stationName: "Mattancherry PS",
        phoneNumber: "0484-2224066",
      },
      {
        stationID: "Kochi_KannamaliPS",
        stationName: "Kannamali PS",
        phoneNumber: "0484-2247461",
      },
      {
        stationID: "Kochi_FortKochiPS",
        stationName: "Fort Kochi PS",
        phoneNumber: "0484-2215055",
      },
      {
        stationID: "Kochi_HarbourPS",
        stationName: "Harbour PS",
        phoneNumber: "0484-2666005",
      },
      {
        stationID: "Kochi_PalluruthyPS",
        stationName: "Palluruthy PS",
        phoneNumber: "0484-2232944",
      },
      {
        stationID: "Kochi_ThoppumpadyPS",
        stationName: "Thoppumpady PS",
        phoneNumber: "0484-2224033",
      },
      {
        stationID: "Kochi_ErnakulamSouthPS",
        stationName: "Ernakulam South PS",
        phoneNumber: "0484-2359350",
      },
      {
        stationID: "Kochi_PanangadPS",
        stationName: "Panangad PS",
        phoneNumber: "0484-2700201",
      },
      {
        stationID: "Kochi_HillPalacePS",
        stationName: "Hill palace PS",
        phoneNumber: "0484-2780228",
      },
      {
        stationID: "Kochi_AmbalameduPS",
        stationName: "Ambalamedu PS",
        phoneNumber: "0484-2720491",
      },
      {
        stationID: "Kochi_UdayamperoorPS",
        stationName: "Udayamperoor PS",
        phoneNumber: "0484-2794039",
      },
      {
        stationID: "Kochi_KalamasseryPS",
        stationName: "Kalamassery PS",
        phoneNumber: "0484-2532050",
      },
      {
        stationID: "Kochi_ThrikkakaraPS",
        stationName: "Thrikkakara PS",
        phoneNumber: "0484-2422365",
      },
    ],
  },
  {
    sector: "Ernakulam Rural",
    stations: [
      {
        stationID: "ErnakulamRural_PassportCell",
        stationName: "Passport Cell",
        phoneNumber: "0484-2622223",
      },
      {
        stationID: "ErnakulamRural_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0484-2630238",
      },
      {
        stationID: "ErnakulamRural_ControlRoomAluva",
        stationName: "Control Room, Aluva",
        phoneNumber: "0484-2621100",
      },
      {
        stationID: "ErnakulamRural_AluvaPS",
        stationName: "Aluva PS",
        phoneNumber: "0484-2624006",
      },
      {
        stationID: "ErnakulamRural_BinanipuramPS",
        stationName: "Binanipuram PS",
        phoneNumber: "0484-2607083",
      },
      {
        stationID: "ErnakulamRural_NorthParurPS",
        stationName: "North Parur PS",
        phoneNumber: "0484-2445525",
      },
      {
        stationID: "ErnakulamRural_VarapuzhaPS",
        stationName: "Varapuzha PS",
        phoneNumber: "0484-2513073",
      },
      {
        stationID: "ErnakulamRural_VadakkekaraPS",
        stationName: "Vadakkekara PS",
        phoneNumber: "0484-2482016",
      },
      {
        stationID: "ErnakulamRural_PuthenvelikkaraPS",
        stationName: "Puthenvelikkara PS",
        phoneNumber: "0484-2487098",
      },
      {
        stationID: "ErnakulamRural_NjarakkalPS",
        stationName: "Njarakkal PS",
        phoneNumber: "0484-2492328",
      },
      {
        stationID: "ErnakulamRural_MunambomPS",
        stationName: "Munambom PS",
        phoneNumber: "0484-2488023",
      },
      {
        stationID: "ErnakulamRural_AngamaliPS",
        stationName: "Angamali PS",
        phoneNumber: "0484-2452328",
      },
      {
        stationID: "ErnakulamRural_ChengamanadPS",
        stationName: "Chengamanad PS",
        phoneNumber: "0484-2474057",
      },
      {
        stationID: "ErnakulamRural_NedumbasseryPS",
        stationName: "Nedumbassery PS",
        phoneNumber: "0484-2610611",
      },
      {
        stationID: "ErnakulamRural_PerumbavoorPS",
        stationName: "Perumbavoor PS",
        phoneNumber: "0484-2523226",
      },
      {
        stationID: "ErnakulamRural_KodanadPS",
        stationName: "Kodanad PS",
        phoneNumber: "0484-2649015",
      },
      {
        stationID: "ErnakulamRural_KunnathunaduPS",
        stationName: "Kunnathunadu PS",
        phoneNumber: "0484-2688260",
      },
      {
        stationID: "ErnakulamRural_ThadiyittaparambaPS",
        stationName: "Thadiyittaparamba PS",
        phoneNumber: "0484-2682260",
      },
      {
        stationID: "ErnakulamRural_KuruppampadyPS",
        stationName: "Kuruppampady PS",
        phoneNumber: "0484-2591511",
      },
      {
        stationID: "ErnakulamRural_KottappadyPS",
        stationName: "Kottappady PS",
        phoneNumber: "0485-2843213",
      },
      {
        stationID: "ErnakulamRural_KaladyPS",
        stationName: "Kalady PS",
        phoneNumber: "0484-2462360",
      },
      {
        stationID: "ErnakulamRural_AyyampuzhaPS",
        stationName: "Ayyampuzha PS",
        phoneNumber: "0484-2696660",
      },
      {
        stationID: "ErnakulamRural_MuvattupuzhaPS",
        stationName: "Muvattupuzha PS",
        phoneNumber: "0485-2832304",
      },
      {
        stationID: "ErnakulamRural_VazhakulamPS",
        stationName: "Vazhakulam PS",
        phoneNumber: "0485-2260258",
      },
      {
        stationID: "ErnakulamRural_PuthencruzPS",
        stationName: "Puthencruz PS",
        phoneNumber: "0484-2760264",
      },
      {
        stationID: "ErnakulamRural_RamamangalamPS",
        stationName: "Ramamangalam PS",
        phoneNumber: "0484-2277223",
      },
      {
        stationID: "ErnakulamRural_KalloorkaduPS",
        stationName: "Kalloorkadu PS",
        phoneNumber: "0485-2289235",
      },
      {
        stationID: "ErnakulamRural_PothanikaduPS",
        stationName: "Pothanikadu PS",
        phoneNumber: "0485-2562031",
      },
      {
        stationID: "ErnakulamRural_KothamangalamPS",
        stationName: "Kothamangalam PS",
        phoneNumber: "0485-2862328",
      },
      {
        stationID: "ErnakulamRural_OonnukalPS",
        stationName: "Oonnukal PS",
        phoneNumber: "0485-2855253",
      },
      {
        stationID: "ErnakulamRural_KuttampuzhaPS",
        stationName: "Kuttampuzha PS",
        phoneNumber: "0485-2588280",
      },
      {
        stationID: "ErnakulamRural_PiravomPS",
        stationName: "Piravom PS",
        phoneNumber: "0485-2242158",
      },
      {
        stationID: "ErnakulamRural_KoothattukulamPS",
        stationName: "Koothattukulam PS",
        phoneNumber: "0485-2252323",
      },
      {
        stationID: "ErnakulamRural_MulanthuruthyPS",
        stationName: "Mulanthuruthy PS",
        phoneNumber: "0484-2740262",
      },
    ],
  },
  {
    sector: "Thrissur City",
    stations: [
      {
        stationID: "ThrissurCity_CrimeStopper1090",
        stationName: "Crime Stopper & 1090",
        phoneNumber: "0487-2363607",
      },
      {
        stationID: "ThrissurCity_VanithaCell",
        stationName: "Vanitha Cell",
        phoneNumber: "0487-2428855",
      },
      {
        stationID: "ThrissurCity_ThrissurHelpline",
        stationName: "Thrissur Helpline",
        phoneNumber: "0487-2428855",
      },
      {
        stationID: "ThrissurCity_TownEastPS",
        stationName: "Town East PS",
        phoneNumber: "0487-2424192",
      },
      {
        stationID: "ThrissurCity_TrafficPS",
        stationName: "Traffic PS",
        phoneNumber: "0487-2445259",
      },
      {
        stationID: "ThrissurCity_VanithaPS",
        stationName: "Vanitha PS",
        phoneNumber: "0487-2444251",
      },
      {
        stationID: "ThrissurCity_TownWestPS",
        stationName: "Town West PS",
        phoneNumber: "0487-2363608",
      },
      {
        stationID: "ThrissurCity_NedupuzhaPS",
        stationName: "Nedupuzha PS",
        phoneNumber: "0487-2447511",
      },
      {
        stationID: "ThrissurCity_OllurPS",
        stationName: "Ollur PS",
        phoneNumber: "0487-2352320",
      },
      {
        stationID: "ThrissurCity_MannuthyPS",
        stationName: "Mannuthy PS",
        phoneNumber: "0487-2370280",
      },
      {
        stationID: "ThrissurCity_PeechiPS",
        stationName: "Peechi PS",
        phoneNumber: "0487-2284040",
      },
      {
        stationID: "ThrissurCity_PeramangalamPS",
        stationName: "Peramangalam PS",
        phoneNumber: "0487-2307237",
      },
      {
        stationID: "ThrissurCity_GuruvayoorPS",
        stationName: "Guruvayoor PS",
        phoneNumber: "0487-2556362",
      },
      {
        stationID: "ThrissurCity_PavarattyPS",
        stationName: "Pavaratty PS",
        phoneNumber: "0487-2643360",
      },
      {
        stationID: "ThrissurCity_ViyyurPS",
        stationName: "Viyyur PS",
        phoneNumber: "0487-2327502",
      },
    ],
  },
  {
    sector: "Thrissur Rural",
    stations: [
      {
        stationID: "ThrissurRural_KunnamkulamPS",
        stationName: "Kunnamkulam PS",
        phoneNumber: "04885-222211",
      },
      {
        stationID: "ThrissurRural_ErumapettyPS",
        stationName: "Erumapetty PS",
        phoneNumber: "04885-262240",
      },
      {
        stationID: "ThrissurRural_ChavakkadPS",
        stationName: "Chavakkad PS",
        phoneNumber: "0487-2507352",
      },
      {
        stationID: "ThrissurRural_VadakkekadPS",
        stationName: "Vadakkekad PS",
        phoneNumber: "0487-2542390",
      },
      {
        stationID: "ThrissurRural_VadakkancheryPS",
        stationName: "Vadakkanchery PS",
        phoneNumber: "04884-232223",
      },
      {
        stationID: "ThrissurRural_CheruthuruthyPS",
        stationName: "Cheruthuruthy PS",
        phoneNumber: "04884-262401",
      },
      {
        stationID: "ThrissurRural_ChelakkaraPS",
        stationName: "Chelakkara PS",
        phoneNumber: "04884-252034",
      },
      {
        stationID: "ThrissurRural_PazhayannurPS",
        stationName: "Pazhayannur PS",
        phoneNumber: "04884-225050",
      },
      {
        stationID: "ThrissurRural_IrinjalakudaPS",
        stationName: "Irinjalakuda PS",
        phoneNumber: "0480-2825228",
      },
      {
        stationID: "ThrissurRural_KattoorPS",
        stationName: "Kattoor PS",
        phoneNumber: "0480-2877590",
      },
      {
        stationID: "ThrissurRural_CherpuPS",
        stationName: "Cherpu PS",
        phoneNumber: "0487-2342220",
      },
      {
        stationID: "ThrissurRural_NedupuzhaPS",
        stationName: "Nedupuzha PS",
        phoneNumber: "0487-2447511",
      },
      {
        stationID: "ThrissurRural_KodungallurPS",
        stationName: "Kodungallur PS",
        phoneNumber: "0480-2800621",
      },
      {
        stationID: "ThrissurRural_ValappadPS",
        stationName: "Valappad PS",
        phoneNumber: "0487-2391236",
      },
      {
        stationID: "ThrissurRural_MathilakomPS",
        stationName: "Mathilakom PS",
        phoneNumber: "0480-2850257",
      },
      {
        stationID: "ThrissurRural_VadanappallyPS",
        stationName: "Vadanappally PS",
        phoneNumber: "0487-2600540",
      },
      {
        stationID: "ThrissurRural_ChalakkudyPS",
        stationName: "Chalakkudy PS",
        phoneNumber: "0480-2708331",
      },
      {
        stationID: "ThrissurRural_AthirappallyPS",
        stationName: "Athirappally PS",
        phoneNumber: "0480-2769004",
      },
      {
        stationID: "ThrissurRural_MalakkaparaPS",
        stationName: "Malakkapara PS",
        phoneNumber: "0425-3237262",
      },
      {
        stationID: "ThrissurRural_KoratyPS",
        stationName: "Koraty PS",
        phoneNumber: "0480-2732593",
      },
      {
        stationID: "ThrissurRural_MalaPS",
        stationName: "Mala PS",
        phoneNumber: "0480-2890241",
      },
      {
        stationID: "ThrissurRural_PudukkadPS",
        stationName: "Pudukkad PS",
        phoneNumber: "0480-2751336",
      },
      {
        stationID: "ThrissurRural_VellikulangaraPS",
        stationName: "Vellikulangara PS",
        phoneNumber: "0480-2740542",
      },
      {
        stationID: "ThrissurRural_AzheekodeCoastalPS",
        stationName: "Azheekode Coastal PS",
        phoneNumber: "0480-2815100",
      },
    ],
  },
  {
    sector: "Malappuram",
    stations: [
      {
        stationID: "Malappuram_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0483-2738660",
      },
      {
        stationID: "Malappuram_MalappuramPS",
        stationName: "Malappuram PS",
        phoneNumber: "0491-2734966",
      },
      {
        stationID: "Malappuram_TrafficPS1",
        stationName: "Traffic PS",
        phoneNumber: "0483-2736599",
      },
      {
        stationID: "Malappuram_VengaraPS",
        stationName: "Vengara PS",
        phoneNumber: "0494-2450210",
      },
      {
        stationID: "Malappuram_KondottyPS",
        stationName: "Kondotty PS",
        phoneNumber: "0491-2712041",
      },
      {
        stationID: "Malappuram_VazhakkadPS",
        stationName: "Vazhakkad PS",
        phoneNumber: "0483-2725212",
      },
      {
        stationID: "Malappuram_TirurangadiPS",
        stationName: "Tirurangadi PS",
        phoneNumber: "0494-2460331",
      },
      {
        stationID: "Malappuram_ThenhipalamPS",
        stationName: "Thenhipalam PS",
        phoneNumber: "0494-2400260",
      },
      {
        stationID: "Malappuram_TrafficPS2",
        stationName: "Traffic PS",
        phoneNumber: "0483-2767496",
      },
      {
        stationID: "Malappuram_ManjeriPS",
        stationName: "Manjeri PS",
        phoneNumber: "0483-2766852",
      },
      {
        stationID: "Malappuram_AreacodePS",
        stationName: "Areacode PS",
        phoneNumber: "0483-2850222",
      },
      {
        stationID: "Malappuram_PerinthalmannaPS",
        stationName: "Perinthalmanna PS",
        phoneNumber: "04933-227231",
      },
      {
        stationID: "Malappuram_KolathurPS",
        stationName: "Kolathur PS",
        phoneNumber: "04933-203244",
      },
      {
        stationID: "Malappuram_PandikadPS",
        stationName: "Pandikad PS",
        phoneNumber: "0483-2783222",
      },
      {
        stationID: "Malappuram_MelatturPS",
        stationName: "Melattur PS",
        phoneNumber: "04933-278221",
      },
      {
        stationID: "Malappuram_KaruvarakunduPS",
        stationName: "Karuvarakundu PS",
        phoneNumber: "04931-280210",
      },
      {
        stationID: "Malappuram_WandoorPS",
        stationName: "Wandoor PS",
        phoneNumber: "04931-247027",
      },
      {
        stationID: "Malappuram_KalikavuPS",
        stationName: "Kalikavu PS",
        phoneNumber: "04931-257222",
      },
      {
        stationID: "Malappuram_EdavannaPS",
        stationName: "Edavanna PS",
        phoneNumber: "0483-2700268",
      },
      {
        stationID: "Malappuram_NilamburPS",
        stationName: "Nilambur PS",
        phoneNumber: "04931-220241",
      },
      {
        stationID: "Malappuram_EdakkaraPS",
        stationName: "Edakkara PS",
        phoneNumber: "04931-275222",
      },
      {
        stationID: "Malappuram_VazhikadavuPS",
        stationName: "Vazhikadavu PS",
        phoneNumber: "04931-275233",
      },
      {
        stationID: "Malappuram_PothukalPS",
        stationName: "Pothukal PS",
        phoneNumber: "04931-241520",
      },
      {
        stationID: "Malappuram_TirurPS",
        stationName: "Tirur PS",
        phoneNumber: "0494-2422046",
      },
      {
        stationID: "Malappuram_KottakkalPS",
        stationName: "Kottakkal PS",
        phoneNumber: "0483-2742253",
      },
      {
        stationID: "Malappuram_TanurPS",
        stationName: "Tanur PS",
        phoneNumber: "0494-2440221",
      },
      {
        stationID: "Malappuram_ParappanangadiPS",
        stationName: "Parappanangadi PS",
        phoneNumber: "0494-2410260",
      },
      {
        stationID: "Malappuram_PonnaniPS",
        stationName: "Ponnani PS",
        phoneNumber: "0494-2666037",
      },
      {
        stationID: "Malappuram_ChangaramkulamPS",
        stationName: "Changaramkulam PS",
        phoneNumber: "0494-2650437",
      },
      {
        stationID: "Malappuram_PerumpadappuPS",
        stationName: "Perumpadappu PS",
        phoneNumber: "0494-2670259",
      },
      {
        stationID: "Malappuram_ValancheryPS",
        stationName: "Valanchery PS",
        phoneNumber: "0494-2644343",
      },
      {
        stationID: "Malappuram_KalpakancheryPS",
        stationName: "Kalpakanchery PS",
        phoneNumber: "0494-2457022",
      },
      {
        stationID: "Malappuram_KuttipuramPS",
        stationName: "Kuttipuram PS",
        phoneNumber: "0494-2608250",
      },
    ],
  },
  {
    sector: "Kozhikode City",
    stations: [
      {
        stationID: "Kozhikode_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0495-1090",
      },
      {
        stationID: "Kozhikode_KozhikodeTownPS",
        stationName: "Kozhikode Town PS",
        phoneNumber: "0495-2366232",
      },
      {
        stationID: "Kozhikode_ChemmangadPS",
        stationName: "Chemmangad PS",
        phoneNumber: "0495-2304178",
      },
      {
        stationID: "Kozhikode_KasabaPS",
        stationName: "Kasaba PS",
        phoneNumber: "0495-2722286",
      },
      {
        stationID: "Kozhikode_PanniankaraPS",
        stationName: "Panniankara PS",
        phoneNumber: "0495-2320860",
      },
      {
        stationID: "Kozhikode_NallalamPS",
        stationName: "Nallalam PS",
        phoneNumber: "0495-2420643",
      },
      {
        stationID: "Kozhikode_FerokePS",
        stationName: "Feroke PS",
        phoneNumber: "0495-2482230",
      },
      {
        stationID: "Kozhikode_BeyporePS",
        stationName: "Beypore PS",
        phoneNumber: "0495-2414002",
      },
      {
        stationID: "Kozhikode_MaradPS",
        stationName: "Marad PS",
        phoneNumber: "0495-2418200",
      },
      {
        stationID: "Kozhikode_MedicalCollegePS",
        stationName: "Medical College PS",
        phoneNumber: "0495-2357691",
      },
      {
        stationID: "Kozhikode_MavoorPS",
        stationName: "Mavoor PS",
        phoneNumber: "0495-2883124",
      },
      {
        stationID: "Kozhikode_NadakkavuPS",
        stationName: "Nadakkavu PS",
        phoneNumber: "0495-2766433",
      },
      {
        stationID: "Kozhikode_ElathurPS",
        stationName: "Elathur PS",
        phoneNumber: "0495-2462045",
      },
      {
        stationID: "Kozhikode_VellayilPS",
        stationName: "Vellayil PS",
        phoneNumber: "0495-2384799",
      },
      {
        stationID: "Kozhikode_ChevayurPS",
        stationName: "Chevayur PS",
        phoneNumber: "0495-2371403",
      },
      {
        stationID: "Kozhikode_KunnamangalamPS",
        stationName: "Kunnamangalam PS",
        phoneNumber: "0495-2800256",
      },
      {
        stationID: "Kozhikode_VanithaPS",
        stationName: "Vanitha PS",
        phoneNumber: "0495-2724070",
      },
    ],
  },
  {
    sector: "Kozhikode Rural",
    stations: [
      {
        stationID: "KozhikodeRural_CrimeStopper",
        stationName: "Crime Stopper Cell",
        phoneNumber: "0496-2523091",
      },
      {
        stationID: "KozhikodeRural_VatakaraPS",
        stationName: "Vatakara PS",
        phoneNumber: "0496-2524206",
      },
      {
        stationID: "KozhikodeRural_EdacherryPS",
        stationName: "Edacherry PS",
        phoneNumber: "0496-2547022",
      },
      {
        stationID: "KozhikodeRural_PayyoliPS",
        stationName: "Payyoli PS",
        phoneNumber: "0496-2602034",
      },
      {
        stationID: "KozhikodeRural_MeppayurPS",
        stationName: "Meppayur PS",
        phoneNumber: "0496-2676220",
      },
      {
        stationID: "KozhikodeRural_NadapuramPS",
        stationName: "Nadapuram PS",
        phoneNumber: "0496-2550225",
      },
      {
        stationID: "KozhikodeRural_ValayamPS",
        stationName: "Valayam PS",
        phoneNumber: "0496-2460699",
      },
      {
        stationID: "KozhikodeRural_KuttiyadiPS",
        stationName: "Kuttiyadi PS",
        phoneNumber: "0496-2597100",
      },
      {
        stationID: "KozhikodeRural_ThottilpalamPS",
        stationName: "Thottilpalam PS",
        phoneNumber: "0496-2565890",
      },
      {
        stationID: "KozhikodeRural_PerambraPS",
        stationName: "Perambra PS",
        phoneNumber: "0496-2610242",
      },
      {
        stationID: "KozhikodeRural_PeruvannamuzhyPS",
        stationName: "Peruvannamuzhy PS",
        phoneNumber: "0496-2662234",
      },
      {
        stationID: "KozhikodeRural_KooranchunduPS",
        stationName: "Kooranchundu PS",
        phoneNumber: "0496-2660222",
      },
      {
        stationID: "KozhikodeRural_ThamarasseryPS",
        stationName: "Thamarassery PS",
        phoneNumber: "0495-2222240",
      },
      {
        stationID: "KozhikodeRural_ThiruvambadiPS",
        stationName: "Thiruvambadi PS",
        phoneNumber: "0495-2252038",
      },
      {
        stationID: "KozhikodeRural_KodencheryPS",
        stationName: "Kodenchery PS",
        phoneNumber: "0495-2236236",
      },
      {
        stationID: "KozhikodeRural_KoduvallyPS",
        stationName: "Koduvally PS",
        phoneNumber: "0495-2210213",
      },
      {
        stationID: "KozhikodeRural_MukkomPS",
        stationName: "Mukkom PS",
        phoneNumber: "0495-2297133",
      },
      {
        stationID: "KozhikodeRural_KoyilandyPS",
        stationName: "Koyilandy PS",
        phoneNumber: "0496-2620236",
      },
      {
        stationID: "KozhikodeRural_AtholyPS",
        stationName: "Atholy PS",
        phoneNumber: "0496-2672233",
      },
      {
        stationID: "KozhikodeRural_BalusseryPS",
        stationName: "Balussery PS",
        phoneNumber: "0496-2642040",
      },
      {
        stationID: "KozhikodeRural_KakkurPS",
        stationName: "Kakkur PS",
        phoneNumber: "0496-2260233",
      },
    ],
  },
  {
    sector: "Wayanad",
    stations: [
      {
        stationID: "Wayanad_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "04936-202521",
      },
      {
        stationID: "Wayanad_TrafficUnit",
        stationName: "Traffic Unit",
        phoneNumber: "04936-202524",
      },
      {
        stationID: "Wayanad_KalpettaPS",
        stationName: "Kalpetta PS",
        phoneNumber: "04936-202400",
      },
      {
        stationID: "Wayanad_MeppadiPS",
        stationName: "Meppadi PS",
        phoneNumber: "04936-282433",
      },
      {
        stationID: "Wayanad_MeenangadiPS",
        stationName: "Meenangadi PS",
        phoneNumber: "04936-247204",
      },
      {
        stationID: "Wayanad_KambalakkadPS",
        stationName: "Kambalakkad PS",
        phoneNumber: "04936-286635",
      },
      {
        stationID: "Wayanad_VythiriPS",
        stationName: "Vythiri PS",
        phoneNumber: "04936-255255",
      },
      {
        stationID: "Wayanad_PadinjaretharaPS",
        stationName: "Padinjarethara PS",
        phoneNumber: "04936-273401",
      },
      {
        stationID: "Wayanad_MananthavadyPS",
        stationName: "Mananthavady PS",
        phoneNumber: "04935-240232",
      },
      {
        stationID: "Wayanad_ThirunellyPS",
        stationName: "Thirunelly PS",
        phoneNumber: "04935-210264",
      },
      {
        stationID: "Wayanad_ThalapuzhaPS",
        stationName: "Thalapuzha PS",
        phoneNumber: "04935-256262",
      },
      {
        stationID: "Wayanad_VellamundaPS",
        stationName: "Vellamunda PS",
        phoneNumber: "04935-230332",
      },
      {
        stationID: "Wayanad_SBatteryPS",
        stationName: "S.Battery PS",
        phoneNumber: "04936-220400",
      },
      {
        stationID: "Wayanad_AmbalavayalPS",
        stationName: "Ambalavayal PS",
        phoneNumber: "04936-260436",
      },
      {
        stationID: "Wayanad_PulpallyPS",
        stationName: "Pulpally PS",
        phoneNumber: "04936-240294",
      },
      {
        stationID: "Wayanad_KenichiraPS",
        stationName: "Kenichira PS",
        phoneNumber: "04936-211545",
      },
    ],
  },
  {
    sector: "Kannur",
    stations: [
      {
        stationID: "Kannur_CrimeStopper",
        stationName: "Crime Stopper",
        phoneNumber: "0497-1090",
      },
      {
        stationID: "Kannur_SHOKannurTown",
        stationName: "SHO Kannur Town",
        phoneNumber: "0497-2763337",
      },
      {
        stationID: "Kannur_SHOTrafficPS",
        stationName: "SHO Traffic PS",
        phoneNumber: "0497-2763338",
      },
      {
        stationID: "Kannur_KannurCityPS",
        stationName: "Kannur City PS",
        phoneNumber: "0497-2731187",
      },
      {
        stationID: "Kannur_EdakkadPS",
        stationName: "Edakkad PS",
        phoneNumber: "0497-2832022",
      },
      {
        stationID: "Kannur_ChackarackalPS",
        stationName: "Chackarackal PS",
        phoneNumber: "0497-2851669",
      },
      {
        stationID: "Kannur_ValapattanamPS",
        stationName: "Valapattanam PS",
        phoneNumber: "0497-2778100",
      },
      {
        stationID: "Kannur_KannapuramPS",
        stationName: "Kannapuram PS",
        phoneNumber: "0497-2860244",
      },
      {
        stationID: "Kannur_IrittyPS",
        stationName: "Iritty PS",
        phoneNumber: "0490-2491221",
      },
      {
        stationID: "Kannur_UlikkalPS",
        stationName: "Ulikkal PS",
        phoneNumber: "0460-2228121",
      },
      {
        stationID: "Kannur_KarikottakariPS",
        stationName: "Karikottakari PS",
        phoneNumber: "0490-2454520",
      },
      {
        stationID: "Kannur_AralamPS",
        stationName: "Aralam PS",
        phoneNumber: "0490-2454540",
      },
      {
        stationID: "Kannur_ThalasseryPS",
        stationName: "Thalassery PS",
        phoneNumber: "0490-2323352",
      },
      {
        stationID: "Kannur_SHODharmadamPS",
        stationName: "SHO Dharmadam PS",
        phoneNumber: "0490-2323353",
      },
      {
        stationID: "Kannur_MattannurPS",
        stationName: "Mattannur PS",
        phoneNumber: "0490-2471244",
      },
      {
        stationID: "Kannur_IrikkurPS",
        stationName: "Irikkur PS",
        phoneNumber: "0460-2257100",
      },
      {
        stationID: "Kannur_PeravoorPS",
        stationName: "Peravoor PS",
        phoneNumber: "0490-2444453",
      },
      {
        stationID: "Kannur_KelakomPS",
        stationName: "Kelakom PS",
        phoneNumber: "0490-2412043",
      },
      {
        stationID: "Kannur_MaloorPS",
        stationName: "Maloor PS",
        phoneNumber: "0490-2400440",
      },
      {
        stationID: "Kannur_KuthuparambaPS",
        stationName: "Kuthuparamba PS",
        phoneNumber: "0490-2361221",
      },
      {
        stationID: "Kannur_KolavallurPS",
        stationName: "Kolavallur PS",
        phoneNumber: "0490-2462025",
      },
      {
        stationID: "Kannur_PanurPS",
        stationName: "Panur PS",
        phoneNumber: "0490-2315181",
      },
      {
        stationID: "Kannur_ChockliPS",
        stationName: "Chockli PS",
        phoneNumber: "0490-2338223",
      },
      {
        stationID: "Kannur_KannavamPS",
        stationName: "Kannavam PS",
        phoneNumber: "0490-2301100",
      },
      {
        stationID: "Kannur_KathirurPS",
        stationName: "Kathirur PS",
        phoneNumber: "0490-2305888",
      },
      {
        stationID: "Kannur_ThaliparambaPS",
        stationName: "Thaliparamba PS",
        phoneNumber: "0460-2203100",
      },
      {
        stationID: "Kannur_PazhangadiPS",
        stationName: "Pazhangadi PS",
        phoneNumber: "0497-2870233",
      },
      {
        stationID: "Kannur_PayyannurPS",
        stationName: "Payyannur PS",
        phoneNumber: "0498-5203032",
      },
      {
        stationID: "Kannur_PeringomePS",
        stationName: "Peringome PS",
        phoneNumber: "0498-5236232",
      },
      {
        stationID: "Kannur_AlakodePS",
        stationName: "Alakode PS",
        phoneNumber: "0460-2255252",
      },
      {
        stationID: "Kannur_KudiyanmalaPS",
        stationName: "Kudiyanmala PS",
        phoneNumber: "0460-2218240",
      },
      {
        stationID: "Kannur_SreekandapuramPS",
        stationName: "Sreekandapuram PS",
        phoneNumber: "0460-2230224",
      },
      {
        stationID: "Kannur_PayyavoorPS",
        stationName: "Payyavoor PS",
        phoneNumber: "0460-2210130",
      },
    ],
  },
  {
    sector: "Kasaragod",
    stations: [
      {
        stationID: "Kasaragod_KasaragodPS",
        stationName: "Kasaragod PS",
        phoneNumber: "04994-230100",
      },
      {
        stationID: "Kasaragod_TrafficPS",
        stationName: "Traffic PS",
        phoneNumber: "04994-224100",
      },
      {
        stationID: "Kasaragod_KumblaPS",
        stationName: "Kumbla PS",
        phoneNumber: "04998-213037",
      },
      {
        stationID: "Kasaragod_ManjeswarPS",
        stationName: "Manjeswar PS",
        phoneNumber: "04998-272640",
      },
      {
        stationID: "Kasaragod_AdhurPS",
        stationName: "Adhur PS",
        phoneNumber: "04994-260024",
      },
      {
        stationID: "Kasaragod_BadiadukkaPS",
        stationName: "Badiadukka PS",
        phoneNumber: "04998-284033",
      },
      {
        stationID: "Kasaragod_BedakomPS",
        stationName: "Bedakom PS",
        phoneNumber: "04994-205238",
      },
      {
        stationID: "Kasaragod_HosdurgPS",
        stationName: "Hosdurg PS",
        phoneNumber: "04672-204229",
      },
      {
        stationID: "Kasaragod_BekalPS",
        stationName: "Bekal PS",
        phoneNumber: "04672-236224",
      },
      {
        stationID: "Kasaragod_AmbalatharaPS",
        stationName: "Ambalathara PS",
        phoneNumber: "04672-243200",
      },
      {
        stationID: "Kasaragod_VellarikunduPS",
        stationName: "Vellarikundu PS",
        phoneNumber: "04672-242300",
      },
      {
        stationID: "Kasaragod_ChittarikalPS",
        stationName: "Chittarikal PS",
        phoneNumber: "04672-221054",
      },
      {
        stationID: "Kasaragod_RajapuramPS",
        stationName: "Rajapuram PS",
        phoneNumber: "04672-224029",
      },
      {
        stationID: "Kasaragod_NileswarPS",
        stationName: "Nileswar PS",
        phoneNumber: "04672-280240",
      },
      {
        stationID: "Kasaragod_CheemeniPS",
        stationName: "Cheemeni PS",
        phoneNumber: "04672-250220",
      },
      {
        stationID: "Kasaragod_ChanderaPS",
        stationName: "Chandera PS",
        phoneNumber: "04672-210242",
      },
      {
        stationID: "Kasaragod_RailwayPSKasaragod",
        stationName: "Railway PS Kasaragod",
        phoneNumber: "04994-223030",
      },
    ],
  },
];
