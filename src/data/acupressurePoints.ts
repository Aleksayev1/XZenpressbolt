import { AcupressurePoint } from '../types';

export const acupressurePoints: AcupressurePoint[] = [
  // Pontos Gratuitos - Gerais
  {
    id: 'yintang-ex-hn3',
    name: 'Yintang (EX-HN3)',
    nameEn: 'Third Eye Point',
    nameEs: 'Punto del Tercer Ojo',
    nameFr: 'Point du Troisième Œil',
    description: 'Localizado entre as sobrancelhas, no centro da testa. Excelente para ansiedade, insônia e dores de cabeça.',
    descriptionEn: 'Located between eyebrows, center of forehead. Excellent for anxiety, insomnia and headaches.',
    descriptionEs: 'Ubicado entre las cejas, centro de la frente. Excelente para ansiedad, insomnio y dolores de cabeza.',
    descriptionFr: 'Situé entre les sourcils, centre du front. Excellent pour l\'anxiété, l\'insomnie et les maux de tête.',
    position: { x: 50, y: 25 },
    benefits: ['Reduz ansiedade e estresse', 'Melhora qualidade do sono', 'Alivia dores de cabeça e enxaquecas', 'Acalma a mente'],
    benefitsEn: ['Reduces anxiety and stress', 'Improves sleep quality', 'Relieves headaches and migraines', 'Calms the mind'],
    benefitsEs: ['Reduce ansiedad y estrés', 'Mejora calidad del sueño', 'Alivia dolores de cabeza y migrañas', 'Calma la mente'],
    benefitsFr: ['Réduit l\'anxiété et le stress', 'Améliore la qualité du sommeil', 'Soulage maux de tête et migraines', 'Calme l\'esprit'],
    isPremium: false,
    category: 'general',
    instructions: 'Pressione suavemente com o dedo médio por 1-2 minutos, respirando profundamente.',
    duration: 120,
    pressure: 'leve'
  },
  {
    id: 'shenmen-he7',
    name: 'Shenmen (HE7)',
    nameEn: 'Spirit Gate',
    nameEs: 'Puerta del Espíritu',
    nameFr: 'Porte de l\'Esprit',
    description: 'No pulso, lado do dedo mindinho. Ponto principal para acalmar a mente e equilibrar emoções.',
    descriptionEn: 'On wrist, pinky side. Main point to calm the mind and balance emotions.',
    descriptionEs: 'En la muñeca, lado del meñique. Punto principal para calmar la mente y equilibrar emociones.',
    descriptionFr: 'Au poignet, côté auriculaire. Point principal pour calmer l\'esprit et équilibrer les émotions.',
    position: { x: 20, y: 70 },
    benefits: ['Reduz estresse e ansiedade', 'Melhora concentração', 'Equilibra emoções', 'Promove relaxamento'],
    benefitsEn: ['Reduces stress and anxiety', 'Improves focus', 'Balances emotions', 'Promotes relaxation'],
    benefitsEs: ['Reduce estrés y ansiedad', 'Mejora concentración', 'Equilibra emociones', 'Promueve relajación'],
    benefitsFr: ['Réduit stress et anxiété', 'Améliore concentration', 'Équilibre émotions', 'Favorise relaxation'],
    isPremium: false,
    category: 'general',
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
    description: 'No topo da cabeça, ponto de encontro de vários meridianos. Aumenta energia e clareza mental.',
    descriptionEn: 'Top of head, meeting point of several meridians. Increases energy and mental clarity.',
    descriptionEs: 'En la parte superior de la cabeza, punto de encuentro de varios meridianos. Aumenta energía y claridad mental.',
    descriptionFr: 'Au sommet de la tête, point de rencontre de plusieurs méridiens. Augmente énergie et clarté mentale.',
    position: { x: 50, y: 10 },
    benefits: ['Aumenta energia vital', 'Melhora memória e concentração', 'Reduz fadiga mental', 'Eleva o humor'],
    benefitsEn: ['Increases vital energy', 'Improves memory and focus', 'Reduces mental fatigue', 'Elevates mood'],
    benefitsEs: ['Aumenta energía vital', 'Mejora memoria y concentración', 'Reduce fatiga mental', 'Eleva el humor'],
    benefitsFr: ['Augmente énergie vitale', 'Améliore mémoire et concentration', 'Réduit fatigue mentale', 'Élève l\'humeur'],
    isPremium: false,
    category: 'general',
    instructions: 'Pressione suavemente o topo da cabeça com a palma da mão por 2-3 minutos.',
    duration: 180,
    pressure: 'leve'
  },
  {
    id: 'hegu-li4',
    name: 'Hegu (LI4)',
    nameEn: 'Joining Valley',
    nameEs: 'Valle de Unión',
    nameFr: 'Vallée de l\'Union',
    description: 'Entre o polegar e indicador. Ponto poderoso para dores em geral e fortalecimento do sistema imune.',
    descriptionEn: 'Between thumb and index finger. Powerful point for general pain and immune system strengthening.',
    descriptionEs: 'Entre pulgar e índice. Punto poderoso para dolores en general y fortalecimiento del sistema inmune.',
    descriptionFr: 'Entre pouce et index. Point puissant pour douleurs générales et renforcement système immunitaire.',
    position: { x: 25, y: 75 },
    benefits: ['Alivia dores de cabeça', 'Fortalece imunidade', 'Reduz dores musculares', 'Melhora circulação'],
    benefitsEn: ['Relieves headaches', 'Strengthens immunity', 'Reduces muscle pain', 'Improves circulation'],
    benefitsEs: ['Alivia dolores de cabeza', 'Fortalece inmunidad', 'Reduce dolores musculares', 'Mejora circulación'],
    benefitsFr: ['Soulage maux de tête', 'Renforce immunité', 'Réduit douleurs musculaires', 'Améliore circulation'],
    isPremium: false,
    category: 'general',
    instructions: 'Pressione firmemente entre polegar e indicador por 1-2 minutos em cada mão.',
    duration: 120,
    pressure: 'firme'
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

  // Pontos Premium - Cranioterapia
  {
    id: 'cranio-frontal',
    name: 'Ponto Frontal Craniano',
    nameEn: 'Cranial Frontal Point',
    nameEs: 'Punto Frontal Craneal',
    nameFr: 'Point Frontal Crânien',
    description: 'Estimula a circulação cerebral e alivia tensões na região frontal.',
    descriptionEn: 'Stimulates brain circulation and relieves frontal region tensions.',
    descriptionEs: 'Estimula circulación cerebral y alivia tensiones región frontal.',
    descriptionFr: 'Stimule circulation cérébrale et soulage tensions région frontale.',
    position: { x: 50, y: 20 },
    benefits: ['Melhora circulação cerebral', 'Alivia tensão frontal', 'Reduz fadiga mental', 'Aumenta clareza'],
    benefitsEn: ['Improves brain circulation', 'Relieves frontal tension', 'Reduces mental fatigue', 'Increases clarity'],
    benefitsEs: ['Mejora circulación cerebral', 'Alivia tensión frontal', 'Reduce fatiga mental', 'Aumenta claridad'],
    benefitsFr: ['Améliore circulation cérébrale', 'Soulage tension frontale', 'Réduit fatigue mentale', 'Augmente clarté'],
    isPremium: true,
    category: 'cranio',
    instructions: 'Aplicar pressão suave com movimentos circulares por 3-4 minutos.',
    duration: 240,
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