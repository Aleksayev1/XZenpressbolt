import { AcupressurePoint } from '../types';

export const acupressurePoints: AcupressurePoint[] = [
  // Pontos Gratuitos - MTC (Medicina Tradicional Chinesa)
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
    benefits: ['Reduz estresse e ansiedade diária', 'Alivia tensão mental', 'Promove relaxamento profundo', 'Acalma a mente agitada'],
    benefitsEn: ['Reduces daily stress and anxiety', 'Relieves mental tension', 'Promotes deep relaxation', 'Calms agitated mind'],
    benefitsEs: ['Reduce estrés y ansiedad diaria', 'Alivia tensión mental', 'Promueve relajación profunda', 'Calma la mente agitada'],
    benefitsFr: ['Réduit stress et anxiété quotidiens', 'Soulage tension mentale', 'Favorise relaxation profonde', 'Calme esprit agité'],
    isPremium: false,
    category: 'mtc',
    instructions: 'Pressione suavemente com o dedo médio por 1-2 minutos, respirando profundamente.',
    duration: 120,
    pressure: 'leve'
  },
  {
    id: 'hegu-li4',
    name: 'Hegu (LI4)',
    nameEn: 'Joining Valley',
    nameEs: 'Valle de Unión',
    nameFr: 'Vallée de l\'Union',
    description: 'Entre o polegar e indicador. Ponto fundamental da MTC para combater fadiga mental e melhorar clareza de pensamento através do equilíbrio energético.',
    descriptionEn: 'Between thumb and index finger. Fundamental TCM point to combat mental fatigue and improve mental clarity through energy balance.',
    descriptionEs: 'Entre pulgar e índice. Punto fundamental de MTC para combatir fatiga mental y mejorar claridad mental a través del equilibrio energético.',
    descriptionFr: 'Entre pouce et index. Point fondamental de MTC pour combattre fatigue mentale et améliorer clarté mentale par équilibre énergétique.',
    position: { x: 25, y: 75 },
    benefits: ['Combate fadiga mental', 'Melhora clareza de pensamento', 'Aumenta capacidade de concentração', 'Equilibra energia mental'],
    benefitsEn: ['Combats mental fatigue', 'Improves mental clarity', 'Increases concentration capacity', 'Balances mental energy'],
    benefitsEs: ['Combate fatiga mental', 'Mejora claridad de pensamiento', 'Aumenta capacidad de concentración', 'Equilibra energía mental'],
    benefitsFr: ['Combat fatigue mentale', 'Améliore clarté de pensée', 'Augmente capacité concentration', 'Équilibre énergie mentale'],
    isPremium: false,
    category: 'mtc', 
    instructions: 'Pressione firmemente entre polegar e indicador por 1-2 minutos em cada mão, focando na circulação de energia para o cérebro.',
    duration: 120,
    pressure: 'firme'
  },

  // Pontos Gratuitos - Craniopuntura
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
    position: { x: 50, y: 20 },
    benefits: ['Reduz estresse e ansiedade', 'Acalma sistema nervoso', 'Promove relaxamento cerebral', 'Diminui tensão craniana'],
    benefitsEn: ['Reduces stress and anxiety', 'Calms nervous system', 'Promotes brain relaxation', 'Decreases cranial tension'],
    benefitsEs: ['Reduce estrés y ansiedad', 'Calma sistema nervioso', 'Promueve relajación cerebral', 'Disminuye tensión craneal'],
    benefitsFr: ['Réduit stress et anxiété', 'Calme système nerveux', 'Favorise relaxation cérébrale', 'Diminue tension crânienne'],
    isPremium: false,
    category: 'craniopuntura',
    instructions: 'Aplicar pressão suave com movimentos circulares na região frontal por 2-3 minutos, focando no relaxamento.',
    duration: 180,
    pressure: 'muito leve'
  },
  {
    id: 'cranio-vertex',
    name: 'Ponto do Vértice Craniano',
    nameEn: 'Cranial Vertex Point',
    nameEs: 'Punto del Vértice Craneal',
    nameFr: 'Point du Sommet Crânien',
    description: 'No topo da cabeça, técnica craniana avançada para combater fadiga mental e melhorar clareza através da estimulação do vértice craniano.',
    descriptionEn: 'At the top of the head, advanced cranial technique to combat mental fatigue and improve clarity through cranial vertex stimulation.',
    descriptionEs: 'En la parte superior de la cabeza, técnica craneal avanzada para combatir fatiga mental y mejorar claridad a través de estimulación del vértice craneal.',
    descriptionFr: 'Au sommet de la tête, technique crânienne avancée pour combattre fatigue mentale et améliorer clarté par stimulation du sommet crânien.',
    position: { x: 50, y: 12 },
    benefits: ['Combate fadiga mental', 'Melhora clareza mental', 'Aumenta capacidade de foco', 'Revitaliza energia cerebral'],
    benefitsEn: ['Combats mental fatigue', 'Improves mental clarity', 'Increases focus capacity', 'Revitalizes brain energy'],
    benefitsEs: ['Combate fatiga mental', 'Mejora claridad mental', 'Aumenta capacidad de enfoque', 'Revitaliza energía cerebral'],
    benefitsFr: ['Combat fatigue mentale', 'Améliore clarté mentale', 'Augmente capacité concentration', 'Revitalise énergie cérébrale'],
    isPremium: false,
    category: 'craniopuntura',
    instructions: 'Pressione suavemente o topo da cabeça com a ponta dos dedos por 2-3 minutos, focando na revitalização mental.',
    duration: 180,
    pressure: 'leve'
  },

  // Pontos Premium - MTC
  {
    id: 'shenmen-he7',
    name: 'Shenmen (HE7)',
    nameEn: 'Spirit Gate',
    nameEs: 'Puerta del Espíritu',
    nameFr: 'Porte de l\'Esprit',
    description: 'No pulso, lado do dedo mindinho. Ponto avançado para equilibrio emocional profundo.',
    descriptionEn: 'On wrist, pinky side. Advanced point for deep emotional balance.',
    descriptionEs: 'En la muñeca, lado del meñique. Punto avanzado para equilibrio emocional profundo.',
    descriptionFr: 'Au poignet, côté auriculaire. Point avancé pour équilibre émotionnel profond.',
    position: { x: 20, y: 70 },
    benefits: ['Equilibrio emocional profundo', 'Reduz ansiedade crônica', 'Melhora qualidade do sono', 'Fortalece sistema nervoso'],
    benefitsEn: ['Deep emotional balance', 'Reduces chronic anxiety', 'Improves sleep quality', 'Strengthens nervous system'],
    benefitsEs: ['Equilibrio emocional profundo', 'Reduce ansiedad crónica', 'Mejora calidad del sueño', 'Fortalece sistema nervioso'],
    benefitsFr: ['Équilibre émotionnel profond', 'Réduit anxiété chronique', 'Améliore qualité sommeil', 'Renforce système nerveux'],
    isPremium: true,
    category: 'mtc',
    instructions: 'Pressione com o polegar na dobra do pulso, lado do mindinho, por 1-3 minutos.',
    duration: 180,
    pressure: 'moderada'
  },
  {
    id: 'baihui-gv20',
    name: 'Baihui (GV20)',
    nameEn: 'Hundred Meetings',
    nameEs: 'Cien Reuniones',
    nameFr: 'Cent Réunions',
    description: 'No topo da cabeça, ponto de encontro de vários meridianos. Técnica avançada para revitalização energética.',
    descriptionEn: 'Top of head, meeting point of several meridians. Advanced technique for energetic revitalization.',
    descriptionEs: 'En la parte superior de la cabeza, punto de encuentro de varios meridianos. Técnica avanzada para revitalización energética.',
    descriptionFr: 'Au sommet de la tête, point de rencontre de plusieurs méridiens. Technique avancée pour revitalisation énergétique.',
    position: { x: 50, y: 10 },
    benefits: ['Revitalização energética completa', 'Melhora memória e cognição', 'Eleva consciência', 'Fortalece energia vital'],
    benefitsEn: ['Complete energetic revitalization', 'Improves memory and cognition', 'Elevates consciousness', 'Strengthens vital energy'],
    benefitsEs: ['Revitalización energética completa', 'Mejora memoria y cognición', 'Eleva conciencia', 'Fortalece energía vital'],
    benefitsFr: ['Revitalisation énergétique complète', 'Améliore mémoire et cognition', 'Élève conscience', 'Renforce énergie vitale'],
    isPremium: true,
    category: 'mtc',
    instructions: 'Pressione suavemente o topo da cabeça com a palma da mão por 2-3 minutos.',
    duration: 180,
    pressure: 'leve'
  },

  // Pontos Premium - Septicemia
  {
    id: 'septicemia-immune-boost',
    name: 'Ponto Imuno-Fortalecedor',
    nameEn: 'Immune Strengthening Point',
    nameEs: 'Punto Fortalecedor Inmune',
    nameFr: 'Point Renforçateur Immunitaire',
    description: 'Ponto específico para fortalecimento do sistema imunológico em casos de septicemia e infecções graves.',
    descriptionEn: 'Specific point for immune system strengthening in septicemia and severe infections.',
    descriptionEs: 'Punto específico para fortalecimiento del sistema inmunológico en septicemia e infecciones graves.',
    descriptionFr: 'Point spécifique pour renforcement système immunitaire en septicémie et infections graves.',
    position: { x: 30, y: 40 },
    benefits: ['Fortalece sistema imunológico', 'Combate infecções sistêmicas', 'Purifica o sangue', 'Aumenta resistência'],
    benefitsEn: ['Strengthens immune system', 'Fights systemic infections', 'Purifies blood', 'Increases resistance'],
    benefitsEs: ['Fortalece sistema inmunológico', 'Combate infecciones sistémicas', 'Purifica sangre', 'Aumenta resistencia'],
    benefitsFr: ['Renforce système immunitaire', 'Combat infections systémiques', 'Purifie le sang', 'Augmente résistance'],
    isPremium: true,
    category: 'septicemia',
    instructions: 'Aplicar pressão moderada por 3-5 minutos, 3x ao dia. Combinar com respiração profunda.',
    duration: 300,
    pressure: 'moderada'
  },
  {
    id: 'septicemia-detox',
    name: 'Ponto Desintoxicante',
    nameEn: 'Detoxifying Point',
    nameEs: 'Punto Desintoxicante',
    nameFr: 'Point Détoxifiant',
    description: 'Estimula a eliminação de toxinas e fortalece os órgãos de desintoxicação.',
    descriptionEn: 'Stimulates toxin elimination and strengthens detoxification organs.',
    descriptionEs: 'Estimula eliminación de toxinas y fortalece órganos de desintoxicación.',
    descriptionFr: 'Stimule élimination toxines et renforce organes détoxification.',
    position: { x: 70, y: 45 },
    benefits: ['Elimina toxinas', 'Fortalece fígado e rins', 'Melhora circulação linfática', 'Reduz inflamação'],
    benefitsEn: ['Eliminates toxins', 'Strengthens liver and kidneys', 'Improves lymphatic circulation', 'Reduces inflammation'],
    benefitsEs: ['Elimina toxinas', 'Fortalece hígado y riñones', 'Mejora circulación linfática', 'Reduce inflamación'],
    benefitsFr: ['Élimine toxines', 'Renforce foie et reins', 'Améliore circulation lymphatique', 'Réduit inflammation'],
    isPremium: true,
    category: 'septicemia',
    instructions: 'Massagear suavemente em movimentos circulares por 2-3 minutos.',
    duration: 180,
    pressure: 'leve'
  },

  // Pontos Premium - ATM (Articulação Temporomandibular)
  {
    id: 'atm-jaw-relief',
    name: 'Ponto Alívio Mandibular',
    nameEn: 'Jaw Relief Point',
    nameEs: 'Punto Alivio Mandibular',
    nameFr: 'Point Soulagement Mandibulaire',
    description: 'Ponto específico para disfunção da ATM, bruxismo e tensão na mandíbula.',
    descriptionEn: 'Specific point for TMJ dysfunction, bruxism and jaw tension.',
    descriptionEs: 'Punto específico para disfunción ATM, bruxismo y tensión mandibular.',
    descriptionFr: 'Point spécifique pour dysfonction ATM, bruxisme et tension mandibulaire.',
    position: { x: 35, y: 35 },
    benefits: ['Alivia dor na mandíbula', 'Reduz tensão facial', 'Melhora abertura bucal', 'Diminui ranger de dentes'],
    benefitsEn: ['Relieves jaw pain', 'Reduces facial tension', 'Improves mouth opening', 'Reduces teeth grinding'],
    benefitsEs: ['Alivia dolor mandibular', 'Reduce tensión facial', 'Mejora apertura bucal', 'Disminuye rechinar dientes'],
    benefitsFr: ['Soulage douleur mâchoire', 'Réduit tension faciale', 'Améliore ouverture buccale', 'Diminue grincement dents'],
    isPremium: true,
    category: 'atm',
    instructions: 'Pressionar suavemente na frente da orelha enquanto abre e fecha a boca lentamente.',
    duration: 240,
    pressure: 'leve'
  },
  {
    id: 'atm-muscle-release',
    name: 'Ponto Relaxamento Muscular',
    nameEn: 'Muscle Release Point',
    nameEs: 'Punto Relajación Muscular',
    nameFr: 'Point Relâchement Musculaire',
    description: 'Relaxa os músculos mastigatórios e reduz a tensão na região temporal.',
    descriptionEn: 'Relaxes chewing muscles and reduces tension in temporal region.',
    descriptionEs: 'Relaja músculos masticatorios y reduce tensión en región temporal.',
    descriptionFr: 'Détend muscles masticateurs et réduit tension région temporale.',
    position: { x: 65, y: 30 },
    benefits: ['Relaxa músculos da mastigação', 'Reduz dor de cabeça tensional', 'Melhora mobilidade mandibular', 'Alivia espasmos'],
    benefitsEn: ['Relaxes chewing muscles', 'Reduces tension headaches', 'Improves jaw mobility', 'Relieves spasms'],
    benefitsEs: ['Relaja músculos masticación', 'Reduce dolor cabeza tensional', 'Mejora movilidad mandibular', 'Alivia espasmos'],
    benefitsFr: ['Détend muscles mastication', 'Réduit maux tête tension', 'Améliore mobilité mandibulaire', 'Soulage spasmes'],
    isPremium: true,
    category: 'atm',
    instructions: 'Massagear em círculos na têmpora por 2-3 minutos com pressão suave.',
    duration: 180,
    pressure: 'leve'
  },

  // Pontos Premium - Craniopuntura Avançada
  {
    id: 'cranio-temporal',
    name: 'Ponto Temporal Craniano',
    nameEn: 'Cranial Temporal Point',
    nameEs: 'Punto Temporal Craneal',
    nameFr: 'Point Temporal Crânien',
    description: 'Técnica avançada de craniopuntura para otimização cognitiva e memória.',
    descriptionEn: 'Advanced craniotherapy technique for cognitive optimization and memory.',
    descriptionEs: 'Técnica avanzada de craniopuntura para optimización cognitiva y memoria.',
    descriptionFr: 'Technique avancée de crâniopuncture pour optimisation cognitive et mémoire.',
    position: { x: 70, y: 25 },
    benefits: ['Otimização cognitiva', 'Melhora memória de longo prazo', 'Aumenta capacidade de aprendizado', 'Fortalece conexões neurais'],
    benefitsEn: ['Cognitive optimization', 'Improves long-term memory', 'Increases learning capacity', 'Strengthens neural connections'],
    benefitsEs: ['Optimización cognitiva', 'Mejora memoria a largo plazo', 'Aumenta capacidad de aprendizaje', 'Fortalece conexiones neurales'],
    benefitsFr: ['Optimisation cognitive', 'Améliore mémoire long terme', 'Augmente capacité apprentissage', 'Renforce connexions neurales'],
    isPremium: true,
    category: 'craniopuntura',
    instructions: 'Aplicar pressão muito suave com movimentos específicos por 4-5 minutos.',
    duration: 300,
    pressure: 'muito leve'
  }
];

export const getPointsByCategory = (category: string, isPremium: boolean = false) => {
  return acupressurePoints.filter(point => 
    point.category === category && (!point.isPremium || isPremium)
  );
};

export const getPremiumPoints = () => {
  return acupressurePoints.filter(point => point.isPremium);
};

export const getFreePoints = () => {
  return acupressurePoints.filter(point => !point.isPremium);
};