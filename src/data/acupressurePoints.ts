import { AcupressurePoint } from '../types';

export const acupressurePoints: AcupressurePoint[] = [
  // ===== PONTOS GRATUITOS - MTC (Medicina Tradicional Chinesa) =====
  {
    id: 'yintang-ex-hn3',
    name: 'Yintang (EX-HN3)',
    nameEn: 'Third Eye Point',
    nameEs: 'Punto del Tercer Ojo',
    nameFr: 'Point du Troisième Œil',
    description: 'Localizado entre as sobrancelhas, no centro da testa. Ponto principal para reduzir estresse, ansiedade e tensão diária.',
    descriptionEn: 'Located between eyebrows, center of forehead. Main point for reducing stress, anxiety and daily tension.',
    descriptionEs: 'Ubicado entre las cejas, centro de la frente. Punto principal para reducir estrés, ansiedad y tensión diaria.',
    descriptionFr: 'Situé entre les sourcils, centre du front. Point principal pour réduire stress, anxiété et tension quotidienne.',
    position: { x: 50, y: 25 },
    image: '/ponto-da-acupuntura-que-tira-ex-hn-yintang-EX HN3.jpg',
    imageAlt: 'Localização do ponto Yintang (EX-HN3) entre as sobrancelhas',
    benefits: ['Reduz estresse e ansiedade diária', 'Alivia tensão mental', 'Promove relaxamento profundo', 'Acalma a mente agitada'],
    benefitsEn: ['Reduces daily stress and anxiety', 'Relieves mental tension', 'Promotes deep relaxation', 'Calms agitated mind'],
    benefitsEs: ['Reduce estrés y ansiedad diaria', 'Alivia tensión mental', 'Promueve relajación profunda', 'Calma la mente agitada'],
    benefitsFr: ['Réduit stress et anxiété quotidiens', 'Soulage tension mentale', 'Favorise relaxation profonde', 'Calme esprit agité'],
    isPremium: false,
    category: 'general',
    instructions: 'Pressione suavemente com o dedo médio por 1-2 minutos, respirando profundamente.',
    duration: 120,
    pressure: 'leve'
  },

  {
    id: 'baihui-basic-vg20',
    name: 'Baihui Básico (VG20)',
    nameEn: 'Basic Hundred Meetings',
    nameEs: 'Cien Reuniones Básico',
    nameFr: 'Cent Réunions Basique',
    description: 'Versão básica do ponto Baihui. Técnica simples para elevar a mente e combater fadiga mental leve.',
    descriptionEn: 'Basic version of Baihui point. Simple technique to elevate mind and combat mild mental fatigue.',
    descriptionEs: 'Versión básica del punto Baihui. Técnica simple para elevar mente y combatir fatiga mental leve.',
    descriptionFr: 'Version basique du point Baihui. Technique simple pour élever esprit et combattre fatigue mentale légère.',
    position: { x: 50, y: 15 },
    image: '/VG20Baihui.jpg',
    imageAlt: 'Localização do ponto Baihui Básico VG20 - Técnica simples',
    benefits: ['Eleva a mente (básico)', 'Combate fadiga leve', 'Melhora clareza básica', 'Fortalece yang suavemente'],
    benefitsEn: ['Elevates mind (basic)', 'Combats mild fatigue', 'Improves basic clarity', 'Gently strengthens yang'],
    benefitsEs: ['Eleva mente (básico)', 'Combate fatiga leve', 'Mejora claridad básica', 'Fortalece yang suavemente'],
    benefitsFr: ['Élève esprit (basique)', 'Combat fatigue légère', 'Améliore clarté basique', 'Renforce yang doucement'],
    isPremium: false,
    category: 'general',
    instructions: 'Técnica básica: Pressione suavemente o topo da cabeça com o dedo médio por 2 minutos.',
    duration: 120,
    pressure: 'leve'
  },

  {
    id: 'yongquan-r1-kd1',
    name: 'Yongquan (R1/KD1) - Fonte Borbulhante',
    nameEn: 'Yongquan (R1/KD1) - Bubbling Spring',
    nameEs: 'Yongquan (R1/KD1) - Fuente Burbujeante', 
    nameFr: 'Yongquan (R1/KD1) - Source Bouillonnante',
    description: 'Ponto dos rins na sola do pé. Acalma a mente, trata vertigem, tontura e agitação. Ponto fundamental para ancoragem energética.',
    descriptionEn: 'Kidney point on sole of foot. Calms mind, treats vertigo, dizziness and agitation. Fundamental point for energetic grounding.',
    descriptionEs: 'Punto de riñones en planta del pie. Calma mente, trata vértigo, mareos y agitación. Punto fundamental para anclaje energético.',
    descriptionFr: 'Point des reins sur plante du pied. Calme esprit, traite vertiges, étourdissements et agitation. Point fondamental pour ancrage énergétique.',
    position: { x: 50, y: 90 },
    image: '/R1 Acalma a mente, Vertigem, Tontura Agitação.jpg',
    imageAlt: 'Localização do ponto Yongquan R1 na sola do pé',
    benefits: ['Acalma a mente agitada', 'Trata vertigem e tontura', 'Reduz agitação e ansiedade', 'Promove ancoragem energética'],
    benefitsEn: ['Calms agitated mind', 'Treats vertigo and dizziness', 'Reduces agitation and anxiety', 'Promotes energetic grounding'],
    benefitsEs: ['Calma mente agitada', 'Trata vértigo y mareos', 'Reduce agitación y ansiedad', 'Promueve anclaje energético'],
    benefitsFr: ['Calme esprit agité', 'Traite vertiges et étourdissements', 'Réduit agitation et anxiété', 'Favorise ancrage énergétique'],
    isPremium: false,
    category: 'general',
    instructions: 'Localizar na sola do pé, na depressão que se forma quando você dobra os dedos. Pressionar firmemente por 2-3 minutos.',
    duration: 180,
    pressure: 'moderada'
  },

  {
    id: 'cranio-frontal',
    name: 'Ponto Frontal Craniano',
    nameEn: 'Cranial Frontal Point',
    nameEs: 'Punto Frontal Craneal',
    nameFr: 'Point Frontal Crânien',
    description: 'Localizado na região frontal, técnica craniana específica para reduzir estresse e ansiedade através da estimulação direta do córtex frontal.',
    descriptionEn: 'Located in frontal region, specific cranial technique to reduce stress and anxiety through direct frontal cortex stimulation.',
    descriptionEs: 'Ubicado en región frontal, técnica craneal específica para reducir estrés y ansiedad a través de estimulación directa del córtex frontal.',
    descriptionFr: 'Situé en région frontale, technique crânienne spécifique pour réduire stress et anxiété par stimulation directe du cortex frontal.',
    position: { x: 50, y: 30 },
    image: '/Ponto A Dor de cabeça e ansiedade cranio.jpg',
    imageAlt: 'Localização do ponto frontal craniano na região frontal da cabeça',
    benefits: ['Reduz estresse e ansiedade', 'Acalma sistema nervoso', 'Promove relaxamento cerebral', 'Diminui tensão craniana'],
    benefitsEn: ['Reduces stress and anxiety', 'Calms nervous system', 'Promotes brain relaxation', 'Decreases cranial tension'],
    benefitsEs: ['Reduce estrés y ansiedad', 'Calma sistema nervioso', 'Promueve relajación cerebral', 'Disminuye tensión craneal'],
    benefitsFr: ['Réduit stress et anxiété', 'Calme système nerveux', 'Favorise relaxation cérébrale', 'Diminue tension crânienne'],
    isPremium: false,
    category: 'cranio',
    instructions: 'Aplicar pressão suave com movimentos circulares na região frontal por 2-3 minutos, focando no relaxamento.',
    duration: 180,
    pressure: 'muito leve'
  },

  // ===== PONTOS PREMIUM - MTC AVANÇADA =====
  {
    id: 'mtc-premium-baihui-advanced',
    name: 'Baihui Premium (VG20) - Protocolo Energético',
    nameEn: 'Premium Baihui (VG20) - Energetic Protocol',
    nameEs: 'Baihui Premium (VG20) - Protocolo Energético',
    nameFr: 'Baihui Premium (VG20) - Protocole Énergétique',
    description: 'Protocolo avançado do ponto Baihui com técnica de ativação energética em espiral. Método premium para revitalização completa do sistema yang.',
    descriptionEn: 'Advanced Baihui protocol with spiral energetic activation technique. Premium method for complete yang system revitalization.',
    descriptionEs: 'Protocolo avanzado del punto Baihui con técnica de activación energética en espiral. Método premium para revitalización completa del sistema yang.',
    descriptionFr: 'Protocole avancé du point Baihui avec technique activation énergétique en spirale. Méthode premium pour revitalisation complète système yang.',
    position: { x: 50, y: 10 },
    image: '/VG20Baihui.jpg',
    imageAlt: 'Localização premium do ponto Baihui VG20 com protocolo energético avançado',
    benefits: ['Ativação energética completa do yang', 'Revitalização profunda do sistema nervoso', 'Melhoria cognitiva avançada', 'Elevação da consciência e clareza mental'],
    benefitsEn: ['Complete yang energetic activation', 'Deep nervous system revitalization', 'Advanced cognitive improvement', 'Consciousness elevation and mental clarity'],
    benefitsEs: ['Activación energética completa del yang', 'Revitalización profunda del sistema nervioso', 'Mejora cognitiva avanzada', 'Elevación de la conciencia y claridad mental'],
    benefitsFr: ['Activation énergétique complète du yang', 'Revitalisation profonde système nerveux', 'Amélioration cognitive avancée', 'Élévation conscience et clarté mentale'],
    isPremium: true,
    category: 'general',
    instructions: 'Técnica em espiral: Inicie com pressão no centro, faça movimentos circulares expandindo em espiral por 3 minutos. Finalize com pressão central por 30s.',
    duration: 210,
    pressure: 'leve a moderada'
  },

  {
    id: 'shenmen-premium-he7',
    name: 'Shenmen Premium (HE7)',
    nameEn: 'Premium Spirit Gate',
    nameEs: 'Puerta del Espíritu Premium',
    nameFr: 'Porte de l\'Esprit Premium',
    description: 'Versão premium do Shenmen com protocolo avançado de 3 fases para ansiedade crônica e distúrbios emocionais severos.',
    descriptionEn: 'Premium version of Shenmen with advanced 3-phase protocol for chronic anxiety and severe emotional disorders.',
    descriptionEs: 'Versión premium del Shenmen con protocolo avanzado de 3 fases para ansiedad crónica y trastornos emocionales severos.',
    descriptionFr: 'Version premium du Shenmen avec protocole avancé 3 phases pour anxiété chronique et troubles émotionnels sévères.',
    position: { x: 20, y: 70 },
    image: '/C 7 Shenmen Acalma a mente Estresse.jpg',
    imageAlt: 'Localização do ponto Shenmen Premium HE7 com protocolo avançado',
    benefits: ['Equilibrio emocional profundo', 'Reduz ansiedade crônica', 'Melhora qualidade do sono', 'Fortalece sistema nervoso'],
    benefitsEn: ['Deep emotional balance', 'Reduces chronic anxiety', 'Improves sleep quality', 'Strengthens nervous system'],
    benefitsEs: ['Equilibrio emocional profundo', 'Reduce ansiedad crónica', 'Mejora calidad del sueño', 'Fortalece sistema nervioso'],
    benefitsFr: ['Équilibre émotionnel profond', 'Réduit anxiété chronique', 'Améliore qualité sommeil', 'Renforce système nerveux'],
    isPremium: true,
    category: 'general',
    instructions: 'PROTOCOLO PREMIUM: Fase 1 (30s pressão leve) → Fase 2 (60s pressão moderada circular) → Fase 3 (30s pressão firme).',
    duration: 180,
    pressure: 'moderada'
  },

  {
    id: 'laogong-premium-pc8',
    name: 'Laogong Premium (PC8)',
    nameEn: 'Premium Labor Palace',
    nameEs: 'Palacio del Trabajo Premium',
    nameFr: 'Palais du Travail Premium',
    description: 'Ponto premium no centro da palma da mão. Técnica avançada para acalmar o coração e reduzir palpitações de origem emocional.',
    descriptionEn: 'Premium point in center of palm. Advanced technique to calm heart and reduce emotional palpitations.',
    descriptionEs: 'Punto premium en centro de palma. Técnica avanzada para calmar corazón y reducir palpitaciones emocionales.',
    descriptionFr: 'Point premium au centre de la paume. Technique avancée pour calmer cœur et réduire palpitations émotionnelles.',
    position: { x: 50, y: 75 },
    image: '/PC8-Laogong-palma-mao.jpg',
    imageAlt: 'Localização do ponto Laogong PC8 no centro da palma da mão',
    benefits: ['Acalma palpitações cardíacas', 'Reduz ansiedade aguda', 'Equilibra energia do coração', 'Promove tranquilidade profunda'],
    benefitsEn: ['Calms heart palpitations', 'Reduces acute anxiety', 'Balances heart energy', 'Promotes deep tranquility'],
    benefitsEs: ['Calma palpitaciones cardíacas', 'Reduce ansiedad aguda', 'Equilibra energía del corazón', 'Promueve tranquilidad profunda'],
    benefitsFr: ['Calme palpitations cardiaques', 'Réduit anxiété aiguë', 'Équilibre énergie du cœur', 'Favorise tranquillité profonde'],
    isPremium: true,
    category: 'general',
    instructions: 'LOCALIZAÇÃO: Centro da palma da mão, onde se forma uma depressão quando você fecha o punho. Pressione firmemente com o polegar da outra mão por 2-3 minutos, respirando profundamente.',
    duration: 180,
    pressure: 'moderada'
  },

  // ===== PONTOS PREMIUM - SEPTICEMIA =====
  {
    id: 'septicemia-quchi-li11',
    name: 'Quchi (LI11) - Anti-Séptico',
    nameEn: 'Quchi (LI11) - Anti-Septic',
    nameEs: 'Quchi (LI11) - Anti-Séptico',
    nameFr: 'Quchi (LI11) - Anti-Septique',
    description: 'Ponto do meridiano do Intestino Grosso, tradicionalmente usado para purificar o sangue e combater infecções sistêmicas. Localizado na dobra do cotovelo.',
    descriptionEn: 'Large Intestine meridian point, traditionally used to purify blood and fight systemic infections. Located at elbow crease.',
    descriptionEs: 'Punto del meridiano Intestino Grueso, tradicionalmente usado para purificar sangre y combatir infecciones sistémicas. Ubicado en pliegue del codo.',
    descriptionFr: 'Point méridien Gros Intestin, traditionnellement utilisé pour purifier sang et combattre infections systémiques. Situé au pli du coude.',
    position: { x: 25, y: 45 },
    image: '/IG11 febre sede herpes prurido.jpg',
    imageAlt: 'Localização do ponto Quchi LI11 para septicemia no cotovelo',
    benefits: ['Purifica o sangue', 'Combate infecções bacterianas', 'Fortalece sistema imunológico', 'Reduz febre e inflamação'],
    benefitsEn: ['Purifies blood', 'Fights bacterial infections', 'Strengthens immune system', 'Reduces fever and inflammation'],
    benefitsEs: ['Purifica sangre', 'Combate infecciones bacterianas', 'Fortalece sistema inmunológico', 'Reduce fiebre e inflamación'],
    benefitsFr: ['Purifie le sang', 'Combat infections bactériennes', 'Renforce système immunitaire', 'Réduit fièvre et inflammation'],
    isPremium: true,
    category: 'septicemia',
    instructions: 'Pressionar firmemente na dobra externa do cotovelo por 2-3 minutos, 4x ao dia durante infecções.',
    duration: 180,
    pressure: 'moderada'
  },

  {
    id: 'septicemia-zusanli-st36',
    name: 'Zusanli (ST36) - Fortaleza Imune',
    nameEn: 'Zusanli (ST36) - Immune Fortress',
    nameEs: 'Zusanli (ST36) - Fortaleza Inmune',
    nameFr: 'Zusanli (ST36) - Forteresse Immunitaire',
    description: 'Ponto de longevidade e vitalidade, fortalece todo o organismo contra infecções. Localizado abaixo do joelho.',
    descriptionEn: 'Longevity and vitality point, strengthens entire organism against infections. Located below knee.',
    descriptionEs: 'Punto de longevidad y vitalidad, fortalece todo el organismo contra infecciones. Ubicado debajo de la rodilla.',
    descriptionFr: 'Point de longévité et vitalité, renforce tout organisme contre infections. Situé sous le genou.',
    position: { x: 45, y: 80 },
    image: '/st 36 Estômago imunidade a.jpg',
    imageAlt: 'Localização do ponto Zusanli ST36 abaixo do joelho',
    benefits: ['Fortalece energia vital', 'Aumenta resistência a infecções', 'Melhora digestão e absorção', 'Acelera recuperação'],
    benefitsEn: ['Strengthens vital energy', 'Increases infection resistance', 'Improves digestion and absorption', 'Accelerates recovery'],
    benefitsEs: ['Fortalece energía vital', 'Aumenta resistencia a infecciones', 'Mejora digestión y absorción', 'Acelera recuperación'],
    benefitsFr: ['Renforce énergie vitale', 'Augmente résistance infections', 'Améliore digestion et absorption', 'Accélère récupération'],
    isPremium: true,
    category: 'septicemia',
    instructions: 'Pressionar 4 dedos abaixo da patela, na lateral externa da tíbia, por 3-5 minutos.',
    duration: 300,
    pressure: 'moderada'
  },

  // ===== PONTOS PREMIUM - ATM (Articulação Temporomandibular) =====
  {
    id: 'atm-ermen-sj21',
    name: 'Ermen (SJ21) - Portal da Orelha',
    nameEn: 'Ermen (SJ21) - Ear Gate',
    nameEs: 'Ermen (SJ21) - Puerta del Oído',
    nameFr: 'Ermen (SJ21) - Porte de l\'Oreille',
    description: 'Ponto do meridiano Triplo Aquecedor, localizado na frente da orelha. Específico para disfunção da ATM e dor mandibular.',
    descriptionEn: 'Triple Heater meridian point, located in front of ear. Specific for TMJ dysfunction and jaw pain.',
    descriptionEs: 'Punto del meridiano Triple Calentador, ubicado frente al oído. Específico para disfunción ATM y dolor mandibular.',
    descriptionFr: 'Point méridien Triple Réchauffeur, situé devant oreille. Spécifique pour dysfonction ATM et douleur mandibulaire.',
    position: { x: 75, y: 30 },
    image: '/TA 21 Ermen Portal da Orelha ATM.jpg',
    imageAlt: 'Localização do ponto Ermen SJ21 na frente da orelha para ATM',
    benefits: ['Alivia dor na ATM', 'Reduz espasmos musculares', 'Melhora abertura bucal', 'Diminui zumbido no ouvido'],
    benefitsEn: ['Relieves TMJ pain', 'Reduces muscle spasms', 'Improves mouth opening', 'Reduces ear ringing'],
    benefitsEs: ['Alivia dolor ATM', 'Reduce espasmos musculares', 'Mejora apertura bucal', 'Disminuye zumbido en oído'],
    benefitsFr: ['Soulage douleur ATM', 'Réduit spasmes musculaires', 'Améliore ouverture buccale', 'Diminue acouphènes'],
    isPremium: true,
    category: 'atm',
    instructions: 'Pressionar suavemente na depressão em frente à orelha enquanto abre e fecha a boca.',
    duration: 180,
    pressure: 'leve'
  },

  // ===== PONTOS PREMIUM - CRANIOPUNTURA AVANÇADA =====
  {
    id: 'cranio-memoria-ms5',
    name: 'Zona da Memória (MS5)',
    nameEn: 'Memory Zone (MS5)',
    nameEs: 'Zona de Memoria (MS5)',
    nameFr: 'Zone Mémoire (MS5)',
    description: 'Área craniana específica para memória e cognição, localizada na região parietal. Técnica avançada de craniopuntura.',
    descriptionEn: 'Specific cranial area for memory and cognition, located in parietal region. Advanced craniotherapy technique.',
    descriptionEs: 'Área craneal específica para memoria y cognición, ubicada en región parietal. Técnica avanzada de craniopuntura.',
    descriptionFr: 'Zone crânienne spécifique pour mémoire et cognition, située en région pariétale. Technique avancée de crâniopuncture.',
    position: { x: 60, y: 20 },
    image: '/Pontos Cerebro e cerebelo Sono, Tonturas, Depressão.jpg',
    imageAlt: 'Localização da zona da memória MS5 na região parietal',
    benefits: ['Melhora memória de trabalho', 'Aumenta capacidade de aprendizado', 'Fortalece conexões neurais', 'Otimiza função cognitiva'],
    benefitsEn: ['Improves working memory', 'Increases learning capacity', 'Strengthens neural connections', 'Optimizes cognitive function'],
    benefitsEs: ['Mejora memoria de trabajo', 'Aumenta capacidad de aprendizaje', 'Fortalece conexiones neurales', 'Optimiza función cognitiva'],
    benefitsFr: ['Améliore mémoire de travail', 'Augmente capacité apprentissage', 'Renforce connexions neurales', 'Optimise fonction cognitive'],
    isPremium: true,
    category: 'cranio',
    instructions: 'Aplicar pressão muito suave com movimentos circulares na região parietal por 5 minutos.',
    duration: 300,
    pressure: 'muito leve'
  },

  {
    id: 'cranio-concentracao-ms6',
    name: 'Zona da Concentração (MS6)',
    nameEn: 'Concentration Zone (MS6)',
    nameEs: 'Zona de Concentración (MS6)',
    nameFr: 'Zone Concentration (MS6)',
    description: 'Área frontal para concentração e foco mental. Estimula o córtex pré-frontal responsável pela atenção executiva.',
    descriptionEn: 'Frontal area for concentration and mental focus. Stimulates prefrontal cortex responsible for executive attention.',
    descriptionEs: 'Área frontal para concentración y enfoque mental. Estimula córtex prefrontal responsable de atención ejecutiva.',
    descriptionFr: 'Zone frontale pour concentration et focus mental. Stimule cortex préfrontal responsable attention exécutive.',
    position: { x: 50, y: 25 },
    image: '/Ponto básico A dor de cabeça e enxaqueca.jpg',
    imageAlt: 'Localização da zona da concentração MS6 na região frontal',
    benefits: ['Aumenta capacidade de foco', 'Melhora atenção sustentada', 'Reduz dispersão mental', 'Otimiza função executiva'],
    benefitsEn: ['Increases focus capacity', 'Improves sustained attention', 'Reduces mental dispersion', 'Optimizes executive function'],
    benefitsEs: ['Aumenta capacidad de enfoque', 'Mejora atención sostenida', 'Reduce dispersión mental', 'Optimiza función ejecutiva'],
    benefitsFr: ['Augmente capacité focus', 'Améliore attention soutenue', 'Réduit dispersion mentale', 'Optimise fonction exécutive'],
    isPremium: true,
    category: 'cranio',
    instructions: 'Pressionar suavemente a região frontal com movimentos específicos por 4-5 minutos.',
    duration: 300,
    pressure: 'muito leve'
  },

  {
    id: 'cranio-ansiedade-ms8',
    name: 'Zona Anti-Ansiedade (MS8)',
    nameEn: 'Anti-Anxiety Zone (MS8)',
    nameEs: 'Zona Anti-Ansiedad (MS8)',
    nameFr: 'Zone Anti-Anxiété (MS8)',
    description: 'Área temporal para controle de ansiedade e regulação emocional. Atua no sistema límbico.',
    descriptionEn: 'Temporal area for anxiety control and emotional regulation. Acts on limbic system.',
    descriptionEs: 'Área temporal para control de ansiedad y regulación emocional. Actúa en sistema límbico.',
    descriptionFr: 'Zone temporale pour contrôle anxiété et régulation émotionnelle. Agit sur système limbique.',
    position: { x: 75, y: 35 },
    image: '/Taiyang.jpg',
    imageAlt: 'Localização da zona anti-ansiedade MS8 na região temporal',
    benefits: ['Reduz ansiedade crônica', 'Regula resposta emocional', 'Acalma sistema nervoso', 'Melhora estabilidade emocional'],
    benefitsEn: ['Reduces chronic anxiety', 'Regulates emotional response', 'Calms nervous system', 'Improves emotional stability'],
    benefitsEs: ['Reduce ansiedad crónica', 'Regula respuesta emocional', 'Calma sistema nervioso', 'Mejora estabilidad emocional'],
    benefitsFr: ['Réduit anxiété chronique', 'Régule réponse émotionnelle', 'Calme système nerveux', 'Améliore stabilité émotionnelle'],
    isPremium: true,
    category: 'cranio',
    instructions: 'Aplicar pressão muito leve na região temporal com técnica específica por 6-8 minutos.',
    duration: 480,
    pressure: 'muito leve'
  },

  // ===== PONTOS PREMIUM - NEUROLOGIA AVANÇADA =====
  {
    id: 'neuro-enxaqueca-ex-hn5',
    name: 'Taiyang (EX-HN5) - Templo Solar',
    nameEn: 'Taiyang (EX-HN5) - Solar Temple',
    nameEs: 'Taiyang (EX-HN5) - Templo Solar',
    nameFr: 'Taiyang (EX-HN5) - Temple Solaire',
    description: 'Ponto extra-meridiano na têmpora, específico para enxaquecas severas e dores de cabeça neurológicas.',
    descriptionEn: 'Extra-meridian point at temple, specific for severe migraines and neurological headaches.',
    descriptionEs: 'Punto extra-meridiano en sien, específico para migrañas severas y dolores de cabeza neurológicos.',
    descriptionFr: 'Point extra-méridien à la tempe, spécifique pour migraines sévères et maux de tête neurologiques.',
    position: { x: 80, y: 28 },
    image: '/Taiyang.jpg',
    imageAlt: 'Localização do ponto Taiyang EX-HN5 na têmpora para enxaqueca',
    benefits: ['Alivia enxaquecas severas', 'Reduz dor neurológica', 'Melhora circulação cerebral', 'Previne crises recorrentes'],
    benefitsEn: ['Relieves severe migraines', 'Reduces neurological pain', 'Improves brain circulation', 'Prevents recurring attacks'],
    benefitsEs: ['Alivia migrañas severas', 'Reduce dolor neurológico', 'Mejora circulación cerebral', 'Previene crisis recurrentes'],
    benefitsFr: ['Soulage migraines sévères', 'Réduit douleur neurologique', 'Améliore circulation cérébrale', 'Prévient crises récurrentes'],
    isPremium: true,
    category: 'general',
    instructions: 'Pressionar suavemente a depressão na têmpora por 3-5 minutos durante crises.',
    duration: 300,
    pressure: 'leve'
  },

  {
    id: 'neuro-insonia-anmian',
    name: 'Anmian - Sono Pacífico',
    nameEn: 'Anmian - Peaceful Sleep',
    nameEs: 'Anmian - Sueño Pacífico',
    nameFr: 'Anmian - Sommeil Paisible',
    description: 'Ponto específico para insônia crônica e distúrbios do sono, localizado atrás da orelha.',
    descriptionEn: 'Specific point for chronic insomnia and sleep disorders, located behind ear.',
    descriptionEs: 'Punto específico para insomnio crónico y trastornos del sueño, ubicado detrás del oído.',
    descriptionFr: 'Point spécifique pour insomnie chronique et troubles du sommeil, situé derrière oreille.',
    position: { x: 85, y: 35 },
    image: '/ANmian sono tranquilo pesadelos.jpg',
    imageAlt: 'Localização do ponto Anmian atrás da orelha para insônia',
    benefits: ['Induz sono profundo', 'Regula ciclo circadiano', 'Reduz ansiedade noturna', 'Melhora qualidade do sono'],
    benefitsEn: ['Induces deep sleep', 'Regulates circadian cycle', 'Reduces nighttime anxiety', 'Improves sleep quality'],
    benefitsEs: ['Induce sueño profundo', 'Regula ciclo circadiano', 'Reduce ansiedad nocturna', 'Mejora calidad del sueño'],
    benefitsFr: ['Induit sommeil profond', 'Régule cycle circadien', 'Réduit anxiété nocturne', 'Améliore qualité sommeil'],
    isPremium: true,
    category: 'general',
    instructions: 'Massagear suavemente atrás da orelha por 5-10 minutos antes de dormir.',
    duration: 600,
    pressure: 'muito leve'
  }
];

// ===== FUNÇÕES OTIMIZADAS PARA CONSULTA =====

/**
 * Busca pontos por categoria com desempenho otimizado
 */
export const getPointsByCategory = (category: string, isPremium: boolean = false) => {
  if (category === 'all') {
    return isPremium ? acupressurePoints : acupressurePoints.filter(p => !p.isPremium);
  }
  
  if (category === 'mtc-premium') {
    const generalPremium = acupressurePoints.filter(p => p.category === 'general' && p.isPremium);
    return isPremium ? generalPremium : [];
  }
  
  const categoryPoints = acupressurePoints.filter(p => p.category === category);
  return isPremium ? categoryPoints : categoryPoints.filter(p => !p.isPremium);
};

/**
 * Retorna pontos premium
 */
export const getPremiumPoints = () => {
  return acupressurePoints.filter(p => p.isPremium);
};

/**
 * Retorna pontos gratuitos
 */
export const getFreePoints = () => {
  return acupressurePoints.filter(p => !p.isPremium);
};

/**
 * Busca ponto por ID
 */
export const getPointById = (id: string): AcupressurePoint | undefined => {
  return acupressurePoints.find(p => p.id === id);
};

/**
 * Retorna estatísticas dos pontos
 */
export const getPointsStats = () => {
  const premiumPoints = getPremiumPoints();
  const freePoints = getFreePoints();
  const categories = [...new Set(acupressurePoints.map(p => p.category))];
  
  return {
    totalPoints: acupressurePoints.length,
    premiumCount: premiumPoints.length,
    freeCount: freePoints.length,
    categoriesCount: categories.length,
    categories
  };
};