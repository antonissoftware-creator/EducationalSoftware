import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.userAnswer.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.place.deleteMany();
  await prisma.moduleSection.deleteMany();
  await prisma.module.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.guestSession.deleteMany();

  const modules = await prisma.$transaction([
    prisma.module.create({
      data: {
        slug: "history",
        titleEn: "Myths & History of Santorini",
        titleEl: "Μύθοι και Ιστορία της Σαντορίνης",
        descriptionEn: "Discover Santorini from mythology to Bronze Age settlements and classical cities.",
        descriptionEl: "Ανακάλυψε τη Σαντορίνη από τη μυθολογία έως τους οικισμούς της Εποχής του Χαλκού και τις κλασικές πόλεις.",
        orderIndex: 1,
        difficulty: "beginner",
        estimatedMinutes: 35,
      },
    }),
    prisma.module.create({
      data: {
        slug: "volcano",
        titleEn: "Volcano, Caldera & Environment",
        titleEl: "Ηφαίστειο, Καλντέρα και Περιβάλλον",
        descriptionEn: "Understand the eruption cycles, caldera formation, and environmental impact.",
        descriptionEl: "Κατανόησε τους κύκλους εκρήξεων, τον σχηματισμό της καλντέρας και τις περιβαλλοντικές επιπτώσεις.",
        orderIndex: 2,
        difficulty: "intermediate",
        estimatedMinutes: 40,
      },
    }),
    prisma.module.create({
      data: {
        slug: "culture",
        titleEn: "Villages, Architecture & Culture",
        titleEl: "Χωριά, Αρχιτεκτονική και Πολιτισμός",
        descriptionEn: "Explore Cycladic architecture, village life, and local traditions across Santorini.",
        descriptionEl: "Εξερεύνησε την κυκλαδίτικη αρχιτεκτονική, τη ζωή στα χωριά και τις τοπικές παραδόσεις της Σαντορίνης.",
        orderIndex: 3,
        difficulty: "intermediate",
        estimatedMinutes: 35,
      },
    }),
  ]);

  const moduleSections: Record<string, Array<{ titleEn: string; titleEl: string; contentEn: string; contentEl: string }>> = {
    history: [
      {
        titleEn: "Origins and Legends",
        titleEl: "Απαρχές και Θρύλοι",
        contentEn: "Ancient stories linked Santorini to Atlantis and sea-faring Minoan worlds.",
        contentEl: "Αρχαίοι μύθοι συνέδεσαν τη Σαντορίνη με την Ατλαντίδα και τον θαλασσοπόρο μινωικό κόσμο.",
      },
      {
        titleEn: "Akrotiri Settlement",
        titleEl: "Οικισμός Ακρωτηρίου",
        contentEn: "Akrotiri preserves multi-storey buildings, drainage systems, and imported goods.",
        contentEl: "Το Ακρωτήρι διατηρεί πολυώροφα κτίρια, αποχετευτικά δίκτυα και εισαγόμενα αγαθά.",
      },
      {
        titleEn: "The Theran Eruption",
        titleEl: "Η Έκρηξη της Θήρας",
        contentEn: "The Bronze Age eruption buried settlements under ash and reshaped Aegean trade.",
        contentEl: "Η έκρηξη της Εποχής του Χαλκού έθαψε οικισμούς κάτω από τέφρα και αναδιαμόρφωσε το εμπόριο του Αιγαίου.",
      },
      {
        titleEn: "Classical and Hellenistic Thera",
        titleEl: "Κλασική και Ελληνιστική Θήρα",
        contentEn: "Later communities built sanctuaries and civic spaces on Mesa Vouno.",
        contentEl: "Αργότερες κοινότητες δημιούργησαν ιερά και δημόσιους χώρους στη Μέσα Βουνό.",
      },
      {
        titleEn: "Archaeology Today",
        titleEl: "Η Αρχαιολογία Σήμερα",
        contentEn: "Modern excavation and conservation reveal how daily life evolved over centuries.",
        contentEl: "Η σύγχρονη ανασκαφή και συντήρηση δείχνουν πώς εξελίχθηκε η καθημερινή ζωή μέσα στους αιώνες.",
      },
    ],
    volcano: [
      {
        titleEn: "Plate Tectonics in the Aegean",
        titleEl: "Τεκτονικές Πλάκες στο Αιγαίο",
        contentEn: "Subduction drives magma movement beneath the South Aegean volcanic arc.",
        contentEl: "Η καταβύθιση πλακών οδηγεί την κίνηση μάγματος κάτω από το ηφαιστειακό τόξο του Νότιου Αιγαίου.",
      },
      {
        titleEn: "How the Caldera Formed",
        titleEl: "Πώς Σχηματίστηκε η Καλντέρα",
        contentEn: "Explosive eruptions and chamber collapse created Santorini's dramatic ring shape.",
        contentEl: "Εκρηκτικές εκρήξεις και κατάρρευση θαλάμου δημιούργησαν το εντυπωσιακό δακτυλιοειδές σχήμα της Σαντορίνης.",
      },
      {
        titleEn: "Nea and Palea Kameni",
        titleEl: "Νέα και Παλαιά Καμένη",
        contentEn: "These volcanic islets continue to record younger eruptive activity.",
        contentEl: "Αυτές οι ηφαιστειακές νησίδες καταγράφουν νεότερη εκρηκτική δραστηριότητα.",
      },
      {
        titleEn: "Hazards and Monitoring",
        titleEl: "Κίνδυνοι και Παρακολούθηση",
        contentEn: "Seismic networks and gas measurements help monitor volcanic changes.",
        contentEl: "Σεισμικά δίκτυα και μετρήσεις αερίων βοηθούν στην παρακολούθηση ηφαιστειακών μεταβολών.",
      },
      {
        titleEn: "Environment and Resilience",
        titleEl: "Περιβάλλον και Ανθεκτικότητα",
        contentEn: "Communities adapt tourism and infrastructure to a dynamic volcanic landscape.",
        contentEl: "Οι κοινότητες προσαρμόζουν τον τουρισμό και τις υποδομές σε ένα δυναμικό ηφαιστειακό τοπίο.",
      },
    ],
    culture: [
      {
        titleEn: "Cycladic Building Style",
        titleEl: "Κυκλαδίτικος Ρυθμός Δόμησης",
        contentEn: "Whitewashed volumes and cave houses respond to climate and terrain.",
        contentEl: "Οι ασβεστωμένοι όγκοι και τα υπόσκαφα σπίτια ανταποκρίνονται στο κλίμα και το ανάγλυφο.",
      },
      {
        titleEn: "Village Patterns",
        titleEl: "Δομή των Χωριών",
        contentEn: "Oia, Pyrgos, and Emporio show defensive planning and layered settlement growth.",
        contentEl: "Η Οία, ο Πύργος και το Εμπορείο δείχνουν αμυντικό σχεδιασμό και πολυεπίπεδη ανάπτυξη οικισμών.",
      },
      {
        titleEn: "Wine and Volcanic Soil",
        titleEl: "Κρασί και Ηφαιστειακό Έδαφος",
        contentEn: "Assyrtiko vineyards thrive in mineral-rich soils and low rainfall conditions.",
        contentEl: "Οι αμπελώνες Ασύρτικου ευδοκιμούν σε εδάφη πλούσια σε μέταλλα και συνθήκες χαμηλής βροχόπτωσης.",
      },
      {
        titleEn: "Festivals and Ritual Life",
        titleEl: "Γιορτές και Τελετουργική Ζωή",
        contentEn: "Religious festivals, music, and communal feasts maintain local identity.",
        contentEl: "Θρησκευτικές γιορτές, μουσική και κοινοτικά πανηγύρια διατηρούν την τοπική ταυτότητα.",
      },
      {
        titleEn: "Preservation and Tourism",
        titleEl: "Διατήρηση και Τουρισμός",
        contentEn: "Balancing heritage conservation with visitor demand is central to modern Santorini.",
        contentEl: "Η ισορροπία ανάμεσα στη διατήρηση της κληρονομιάς και τη ζήτηση επισκεπτών είναι κρίσιμη στη σύγχρονη Σαντορίνη.",
      },
    ],
  };

  for (const learningModule of modules) {
    const sections = moduleSections[learningModule.slug] ?? [];
    await prisma.moduleSection.createMany({
      data: sections.map((section, index) => ({
        moduleId: learningModule.id,
        orderIndex: index + 1,
        mediaType: "image",
        mediaUrl: null,
        ...section,
      })),
    });
  }

  const quizContent: Record<string, Array<{ questionEn: string; questionEl: string; category: string; difficulty: string; explanationEn: string; explanationEl: string; options: Array<{ textEn: string; textEl: string; isCorrect: boolean }> }>> = {
    history: [
      {
        questionEn: "Which site is best known as a Bronze Age settlement preserved by volcanic ash?",
        questionEl: "Ποιος χώρος είναι γνωστός ως οικισμός της Εποχής του Χαλκού που διατηρήθηκε από ηφαιστειακή τέφρα;",
        category: "history",
        difficulty: "beginner",
        explanationEn: "Akrotiri was buried by ash, preserving urban structures and artifacts.",
        explanationEl: "Το Ακρωτήρι θάφτηκε από τέφρα, διατηρώντας αστικές δομές και ευρήματα.",
        options: [
          { textEn: "Akrotiri", textEl: "Ακρωτήρι", isCorrect: true },
          { textEn: "Delos", textEl: "Δήλος", isCorrect: false },
          { textEn: "Knossos", textEl: "Κνωσός", isCorrect: false },
          { textEn: "Rhodes", textEl: "Ρόδος", isCorrect: false },
        ],
      },
      {
        questionEn: "True or False: Ancient Thera was built on Mesa Vouno.",
        questionEl: "Σωστό ή Λάθος: Η Αρχαία Θήρα χτίστηκε στη Μέσα Βουνό.",
        category: "history",
        difficulty: "beginner",
        explanationEn: "Ancient Thera occupied Mesa Vouno ridge in later periods.",
        explanationEl: "Η Αρχαία Θήρα αναπτύχθηκε στη ράχη της Μέσα Βουνό σε μεταγενέστερες περιόδους.",
        options: [
          { textEn: "True", textEl: "Σωστό", isCorrect: true },
          { textEn: "False", textEl: "Λάθος", isCorrect: false },
        ],
      },
      {
        questionEn: "What made Akrotiri especially important for archaeologists?",
        questionEl: "Τι έκανε το Ακρωτήρι ιδιαίτερα σημαντικό για τους αρχαιολόγους;",
        category: "history",
        difficulty: "beginner",
        explanationEn: "Its preservation includes architecture, frescoes, and infrastructure details.",
        explanationEl: "Η διατήρησή του περιλαμβάνει αρχιτεκτονική, τοιχογραφίες και λεπτομέρειες υποδομών.",
        options: [
          { textEn: "Excellent preservation of daily life", textEl: "Εξαιρετική διατήρηση της καθημερινής ζωής", isCorrect: true },
          { textEn: "Largest Roman amphitheater", textEl: "Μεγαλύτερο ρωμαϊκό αμφιθέατρο", isCorrect: false },
          { textEn: "Only site with marble temples", textEl: "Μοναδικός χώρος με μαρμάρινους ναούς", isCorrect: false },
          { textEn: "No trade connections", textEl: "Χωρίς εμπορικές συνδέσεις", isCorrect: false },
        ],
      },
      {
        questionEn: "Which event buried Akrotiri?",
        questionEl: "Ποιο γεγονός έθαψε το Ακρωτήρι;",
        category: "history",
        difficulty: "beginner",
        explanationEn: "A major Theran volcanic eruption covered the city in ash layers.",
        explanationEl: "Μια μεγάλη ηφαιστειακή έκρηξη της Θήρας κάλυψε την πόλη με στρώματα τέφρας.",
        options: [
          { textEn: "The Theran eruption", textEl: "Η έκρηξη της Θήρας", isCorrect: true },
          { textEn: "A major earthquake only", textEl: "Μόνο ένας μεγάλος σεισμός", isCorrect: false },
          { textEn: "A tsunami from Crete", textEl: "Τσουνάμι από την Κρήτη", isCorrect: false },
          { textEn: "A Persian invasion", textEl: "Περσική εισβολή", isCorrect: false },
        ],
      },
      {
        questionEn: "True or False: Imported goods at Akrotiri suggest long-distance trade.",
        questionEl: "Σωστό ή Λάθος: Τα εισαγόμενα αγαθά στο Ακρωτήρι δείχνουν εμπορικές σχέσεις μεγάλων αποστάσεων.",
        category: "history",
        difficulty: "intermediate",
        explanationEn: "Imported artifacts indicate broad Aegean and eastern Mediterranean links.",
        explanationEl: "Τα εισαγόμενα ευρήματα δείχνουν ευρείες διασυνδέσεις στο Αιγαίο και την ανατολική Μεσόγειο.",
        options: [
          { textEn: "True", textEl: "Σωστό", isCorrect: true },
          { textEn: "False", textEl: "Λάθος", isCorrect: false },
        ],
      },
      {
        questionEn: "Who led major excavations at Akrotiri beginning in 1967?",
        questionEl: "Ποιος ηγήθηκε των μεγάλων ανασκαφών στο Ακρωτήρι που ξεκίνησαν το 1967;",
        category: "history",
        difficulty: "intermediate",
        explanationEn: "Spyridon Marinatos initiated the modern excavation campaign.",
        explanationEl: "Ο Σπυρίδων Μαρινάτος ξεκίνησε τη σύγχρονη ανασκαφική εκστρατεία.",
        options: [
          { textEn: "Spyridon Marinatos", textEl: "Σπυρίδων Μαρινάτος", isCorrect: true },
          { textEn: "Arthur Evans", textEl: "Άρθουρ Έβανς", isCorrect: false },
          { textEn: "Heinrich Schliemann", textEl: "Χάινριχ Σλήμαν", isCorrect: false },
          { textEn: "Michael Ventris", textEl: "Μάικλ Βέντρις", isCorrect: false },
        ],
      },
    ],
    volcano: [
      {
        questionEn: "What geologic process drives volcanism in Santorini?",
        questionEl: "Ποια γεωλογική διαδικασία οδηγεί τον ηφαιστεισμό στη Σαντορίνη;",
        category: "volcano",
        difficulty: "beginner",
        explanationEn: "Subduction in the South Aegean arc fuels magma generation.",
        explanationEl: "Η καταβύθιση στο Νότιο Αιγαίο τροφοδοτεί τη δημιουργία μάγματος.",
        options: [
          { textEn: "Subduction", textEl: "Καταβύθιση", isCorrect: true },
          { textEn: "Glacial rebound", textEl: "Μεταπαγετωνική ανύψωση", isCorrect: false },
          { textEn: "River erosion", textEl: "Διάβρωση ποταμών", isCorrect: false },
          { textEn: "Meteor impacts", textEl: "Πτώσεις μετεωριτών", isCorrect: false },
        ],
      },
      {
        questionEn: "True or False: The caldera was formed by collapse after major eruptions.",
        questionEl: "Σωστό ή Λάθος: Η καλντέρα σχηματίστηκε από κατάρρευση μετά από μεγάλες εκρήξεις.",
        category: "volcano",
        difficulty: "beginner",
        explanationEn: "Large eruptions emptied magma chambers, leading to collapse.",
        explanationEl: "Μεγάλες εκρήξεις άδειασαν θαλάμους μάγματος, οδηγώντας σε κατάρρευση.",
        options: [
          { textEn: "True", textEl: "Σωστό", isCorrect: true },
          { textEn: "False", textEl: "Λάθος", isCorrect: false },
        ],
      },
      {
        questionEn: "Which islands in the caldera are linked to younger volcanic activity?",
        questionEl: "Ποιες νησίδες στην καλντέρα συνδέονται με νεότερη ηφαιστειακή δραστηριότητα;",
        category: "volcano",
        difficulty: "beginner",
        explanationEn: "Nea Kameni and Palea Kameni are volcanic islets within the caldera.",
        explanationEl: "Η Νέα και η Παλαιά Καμένη είναι ηφαιστειακές νησίδες μέσα στην καλντέρα.",
        options: [
          { textEn: "Nea Kameni and Palea Kameni", textEl: "Νέα Καμένη και Παλαιά Καμένη", isCorrect: true },
          { textEn: "Oia and Fira", textEl: "Οία και Φηρά", isCorrect: false },
          { textEn: "Naxos and Paros", textEl: "Νάξος και Πάρος", isCorrect: false },
          { textEn: "Milos and Sifnos", textEl: "Μήλος και Σίφνος", isCorrect: false },
        ],
      },
      {
        questionEn: "Which monitoring method helps track volcanic unrest?",
        questionEl: "Ποια μέθοδος παρακολούθησης βοηθά στην ανίχνευση ηφαιστειακής ανησυχίας;",
        category: "volcano",
        difficulty: "intermediate",
        explanationEn: "Seismic monitoring captures earthquake swarms tied to magma movement.",
        explanationEl: "Η σεισμική παρακολούθηση καταγράφει σμήνη σεισμών που συνδέονται με κίνηση μάγματος.",
        options: [
          { textEn: "Seismic network analysis", textEl: "Ανάλυση σεισμικών δικτύων", isCorrect: true },
          { textEn: "Street traffic counts", textEl: "Καταμέτρηση κυκλοφορίας", isCorrect: false },
          { textEn: "Tourist arrivals", textEl: "Αφίξεις τουριστών", isCorrect: false },
          { textEn: "Hotel occupancy", textEl: "Πληρότητα ξενοδοχείων", isCorrect: false },
        ],
      },
      {
        questionEn: "True or False: Volcanic soils influence Santorini agriculture.",
        questionEl: "Σωστό ή Λάθος: Τα ηφαιστειακά εδάφη επηρεάζουν τη γεωργία της Σαντορίνης.",
        category: "volcano",
        difficulty: "beginner",
        explanationEn: "Mineral-rich volcanic soils support unique crops like Assyrtiko grapes.",
        explanationEl: "Τα εδάφη πλούσια σε μέταλλα υποστηρίζουν ιδιαίτερες καλλιέργειες όπως το Ασύρτικο.",
        options: [
          { textEn: "True", textEl: "Σωστό", isCorrect: true },
          { textEn: "False", textEl: "Λάθος", isCorrect: false },
        ],
      },
      {
        questionEn: "What is a key challenge for modern Santorini communities?",
        questionEl: "Ποια είναι μια βασική πρόκληση για τις σύγχρονες κοινότητες της Σαντορίνης;",
        category: "volcano",
        difficulty: "intermediate",
        explanationEn: "They must balance tourism, infrastructure, and volcanic risk awareness.",
        explanationEl: "Πρέπει να ισορροπήσουν τουρισμό, υποδομές και επίγνωση ηφαιστειακού κινδύνου.",
        options: [
          { textEn: "Balancing growth with volcanic risk", textEl: "Ισορροπία ανάπτυξης και ηφαιστειακού κινδύνου", isCorrect: true },
          { textEn: "Avoiding all sea transport", textEl: "Αποφυγή κάθε θαλάσσιας μεταφοράς", isCorrect: false },
          { textEn: "Eliminating agriculture", textEl: "Κατάργηση γεωργίας", isCorrect: false },
          { textEn: "Moving all villages inland", textEl: "Μετακίνηση όλων των χωριών στην ενδοχώρα", isCorrect: false },
        ],
      },
    ],
    culture: [
      {
        questionEn: "Which grape variety is strongly associated with Santorini wines?",
        questionEl: "Ποια ποικιλία σταφυλιού συνδέεται έντονα με τα κρασιά της Σαντορίνης;",
        category: "villages",
        difficulty: "beginner",
        explanationEn: "Assyrtiko is one of Santorini's signature grape varieties.",
        explanationEl: "Το Ασύρτικο είναι μία από τις χαρακτηριστικές ποικιλίες της Σαντορίνης.",
        options: [
          { textEn: "Assyrtiko", textEl: "Ασύρτικο", isCorrect: true },
          { textEn: "Merlot", textEl: "Μερλό", isCorrect: false },
          { textEn: "Pinot Noir", textEl: "Πινό Νουάρ", isCorrect: false },
          { textEn: "Cabernet Sauvignon", textEl: "Καμπερνέ Σοβινιόν", isCorrect: false },
        ],
      },
      {
        questionEn: "True or False: Cycladic architecture often uses whitewashed facades.",
        questionEl: "Σωστό ή Λάθος: Η κυκλαδίτικη αρχιτεκτονική χρησιμοποιεί συχνά ασβεστωμένες όψεις.",
        category: "villages",
        difficulty: "beginner",
        explanationEn: "Whitewashed walls are a defining visual feature of Cycladic settlements.",
        explanationEl: "Οι ασβεστωμένοι τοίχοι είναι χαρακτηριστικό οπτικό γνώρισμα των κυκλαδίτικων οικισμών.",
        options: [
          { textEn: "True", textEl: "Σωστό", isCorrect: true },
          { textEn: "False", textEl: "Λάθος", isCorrect: false },
        ],
      },
      {
        questionEn: "Why are many traditional homes built partially into volcanic rock?",
        questionEl: "Γιατί πολλά παραδοσιακά σπίτια είναι χτισμένα μερικώς μέσα στο ηφαιστειακό πέτρωμα;",
        category: "villages",
        difficulty: "intermediate",
        explanationEn: "Cave-style homes moderate temperature and fit steep terrain.",
        explanationEl: "Τα υπόσκαφα σπίτια εξομαλύνουν τη θερμοκρασία και ταιριάζουν σε απότομο ανάγλυφο.",
        options: [
          { textEn: "For thermal comfort and terrain adaptation", textEl: "Για θερμική άνεση και προσαρμογή στο ανάγλυφο", isCorrect: true },
          { textEn: "To hide from ships", textEl: "Για να κρύβονται από πλοία", isCorrect: false },
          { textEn: "Only for decoration", textEl: "Μόνο για διακόσμηση", isCorrect: false },
          { textEn: "Because wood was forbidden", textEl: "Επειδή απαγορευόταν το ξύλο", isCorrect: false },
        ],
      },
      {
        questionEn: "Which village is known for sunset views and white-blue architecture?",
        questionEl: "Ποιο χωριό είναι γνωστό για τα ηλιοβασιλέματα και τη λευκο-μπλε αρχιτεκτονική;",
        category: "villages",
        difficulty: "beginner",
        explanationEn: "Oia is internationally recognized for sunset viewpoints and architecture.",
        explanationEl: "Η Οία είναι διεθνώς γνωστή για τα σημεία θέας στο ηλιοβασίλεμα και την αρχιτεκτονική της.",
        options: [
          { textEn: "Oia", textEl: "Οία", isCorrect: true },
          { textEn: "Perissa", textEl: "Περίσσα", isCorrect: false },
          { textEn: "Kamari", textEl: "Καμάρι", isCorrect: false },
          { textEn: "Imerovigli", textEl: "Ημεροβίγλι", isCorrect: false },
        ],
      },
      {
        questionEn: "True or False: Local festivals contribute to preserving cultural identity.",
        questionEl: "Σωστό ή Λάθος: Οι τοπικές γιορτές συμβάλλουν στη διατήρηση της πολιτιστικής ταυτότητας.",
        category: "villages",
        difficulty: "beginner",
        explanationEn: "Festival traditions reinforce social memory and community bonds.",
        explanationEl: "Οι παραδόσεις των γιορτών ενισχύουν τη συλλογική μνήμη και τους δεσμούς κοινότητας.",
        options: [
          { textEn: "True", textEl: "Σωστό", isCorrect: true },
          { textEn: "False", textEl: "Λάθος", isCorrect: false },
        ],
      },
      {
        questionEn: "What is the main long-term challenge for heritage villages in Santorini?",
        questionEl: "Ποια είναι η βασική μακροπρόθεσμη πρόκληση για τα χωριά πολιτιστικής κληρονομιάς στη Σαντορίνη;",
        category: "villages",
        difficulty: "intermediate",
        explanationEn: "Balancing tourism growth with architectural and cultural preservation is critical.",
        explanationEl: "Η ισορροπία μεταξύ τουριστικής ανάπτυξης και διατήρησης αρχιτεκτονικής και πολιτισμού είναι κρίσιμη.",
        options: [
          { textEn: "Balancing tourism with preservation", textEl: "Ισορροπία τουρισμού και διατήρησης", isCorrect: true },
          { textEn: "Removing all old buildings", textEl: "Κατεδάφιση όλων των παλαιών κτιρίων", isCorrect: false },
          { textEn: "Closing villages to residents", textEl: "Κλείσιμο χωριών στους κατοίκους", isCorrect: false },
          { textEn: "Replacing vineyards with highways", textEl: "Αντικατάσταση αμπελώνων με αυτοκινητόδρομους", isCorrect: false },
        ],
      },
    ],
  };

  const quizzes: Record<string, string> = {};
  for (const learningModule of modules) {
    const quiz = await prisma.quiz.create({
      data: {
        moduleId: learningModule.id,
        titleEn: `${learningModule.titleEn} Quiz`,
        titleEl: `Κουίζ: ${learningModule.titleEl}`,
        type: "module",
      },
    });
    quizzes[learningModule.slug] = quiz.id;

    const questions = quizContent[learningModule.slug] ?? [];
    for (const [index, questionData] of questions.entries()) {
      const question = await prisma.question.create({
        data: {
          quizId: quiz.id,
          questionEn: questionData.questionEn,
          questionEl: questionData.questionEl,
          type: questionData.options.length === 2 ? "true_false" : "multiple_choice",
          category: questionData.category,
          difficulty: questionData.difficulty,
          explanationEn: questionData.explanationEn,
          explanationEl: questionData.explanationEl,
          orderIndex: index + 1,
        },
      });

      await prisma.questionOption.createMany({
        data: questionData.options.map((option, optionIndex) => ({
          questionId: question.id,
          textEn: option.textEn,
          textEl: option.textEl,
          isCorrect: option.isCorrect,
          orderIndex: optionIndex + 1,
        })),
      });
    }
  }

  await prisma.quiz.create({
    data: {
      titleEn: "Santorini Final Review",
      titleEl: "Τελική Ανασκόπηση Σαντορίνης",
      type: "final",
      questions: {
        create: Array.from({ length: 10 }).map((_, index) => {
          const categories = ["history", "volcano", "villages"] as const;
          const category = categories[index % categories.length];
          return {
            questionEn: `Final review question ${index + 1} about ${category}?`,
            questionEl: `Τελική ερώτηση ${index + 1} για ${category};`,
            type: "multiple_choice",
            category,
            difficulty: "intermediate",
            explanationEn: "Review all modules to reinforce this concept.",
            explanationEl: "Ανασκόπησε όλες τις ενότητες για να ενισχύσεις αυτή την έννοια.",
            orderIndex: index + 1,
            options: {
              create: [
                { textEn: "Correct answer", textEl: "Σωστή απάντηση", isCorrect: true, orderIndex: 1 },
                { textEn: "Distractor A", textEl: "Αποπροσανατολιστική Α", isCorrect: false, orderIndex: 2 },
                { textEn: "Distractor B", textEl: "Αποπροσανατολιστική Β", isCorrect: false, orderIndex: 3 },
                { textEn: "Distractor C", textEl: "Αποπροσανατολιστική Γ", isCorrect: false, orderIndex: 4 },
              ],
            },
          };
        }),
      },
    },
  });

  await prisma.place.createMany({
    data: [
      {
        titleEn: "Akrotiri",
        titleEl: "Ακρωτήρι",
        descriptionEn: "Bronze Age archaeological site preserved by ash.",
        descriptionEl: "Αρχαιολογικός χώρος της Εποχής του Χαλκού διατηρημένος από τέφρα.",
        category: "history",
        latitude: 36.3527,
        longitude: 25.403,
        relatedModuleId: modules[0].id,
      },
      {
        titleEn: "Ancient Thera",
        titleEl: "Αρχαία Θήρα",
        descriptionEn: "Classical settlement on Mesa Vouno with panoramic views.",
        descriptionEl: "Κλασικός οικισμός στη Μέσα Βουνό με πανοραμική θέα.",
        category: "history",
        latitude: 36.3648,
        longitude: 25.4812,
        relatedModuleId: modules[0].id,
      },
      {
        titleEn: "Nea Kameni",
        titleEl: "Νέα Καμένη",
        descriptionEn: "Active volcanic islet in the center of the caldera.",
        descriptionEl: "Ενεργή ηφαιστειακή νησίδα στο κέντρο της καλντέρας.",
        category: "volcano",
        latitude: 36.4018,
        longitude: 25.3964,
        relatedModuleId: modules[1].id,
      },
      {
        titleEn: "Palea Kameni",
        titleEl: "Παλαιά Καμένη",
        descriptionEn: "Older volcanic islet with thermal activity nearby.",
        descriptionEl: "Παλαιότερη ηφαιστειακή νησίδα με γειτονική θερμική δραστηριότητα.",
        category: "volcano",
        latitude: 36.3929,
        longitude: 25.377,
        relatedModuleId: modules[1].id,
      },
      {
        titleEn: "Oia",
        titleEl: "Οία",
        descriptionEn: "Village famous for sunset views and Cycladic architecture.",
        descriptionEl: "Χωριό γνωστό για τα ηλιοβασιλέματα και την κυκλαδίτικη αρχιτεκτονική.",
        category: "villages",
        latitude: 36.4618,
        longitude: 25.3753,
        relatedModuleId: modules[2].id,
      },
      {
        titleEn: "Pyrgos",
        titleEl: "Πύργος",
        descriptionEn: "Historic inland village with traditional urban layout.",
        descriptionEl: "Ιστορικό χωριό στην ενδοχώρα με παραδοσιακή πολεοδομική διάταξη.",
        category: "villages",
        latitude: 36.3827,
        longitude: 25.4496,
        relatedModuleId: modules[2].id,
      },
    ],
  });

  const passwordHash = await bcrypt.hash("Password123!", 10);

  const [student, explorer] = await prisma.$transaction([
    prisma.user.create({
      data: {
        email: "student@santorini.local",
        passwordHash,
        name: "Sample Student",
        preferredLanguage: "en",
        settings: { create: { aiEnabled: false, language: "en" } },
      },
    }),
    prisma.user.create({
      data: {
        email: "explorer@santorini.local",
        passwordHash,
        name: "Museum Explorer",
        preferredLanguage: "en",
        settings: { create: { aiEnabled: true, language: "en" } },
      },
    }),
  ]);

  await prisma.progress.createMany({
    data: [
      { userId: student.id, moduleId: modules[0].id, completedSections: 5, completionPercentage: 100, isCompleted: true },
      { userId: student.id, moduleId: modules[1].id, completedSections: 4, completionPercentage: 80, isCompleted: false },
      { userId: student.id, moduleId: modules[2].id, completedSections: 2, completionPercentage: 40, isCompleted: false },
      { userId: explorer.id, moduleId: modules[0].id, completedSections: 5, completionPercentage: 100, isCompleted: true },
      { userId: explorer.id, moduleId: modules[1].id, completedSections: 5, completionPercentage: 100, isCompleted: true },
      { userId: explorer.id, moduleId: modules[2].id, completedSections: 5, completionPercentage: 100, isCompleted: true },
    ],
  });

  const allPlaces = await prisma.place.findMany();
  await prisma.favorite.createMany({
    data: [
      { userId: student.id, placeId: allPlaces[0].id },
      { userId: student.id, placeId: allPlaces[2].id },
      { userId: explorer.id, placeId: allPlaces[4].id },
      { userId: explorer.id, placeId: allPlaces[5].id },
    ],
  });

  const sectionsByModule = await prisma.moduleSection.findMany({ orderBy: [{ moduleId: "asc" }, { orderIndex: "asc" }] });
  await prisma.bookmark.createMany({
    data: [
      { userId: student.id, moduleId: modules[0].id, sectionId: sectionsByModule.find((s) => s.moduleId === modules[0].id)?.id ?? null },
      { userId: student.id, moduleId: modules[1].id, sectionId: sectionsByModule.find((s) => s.moduleId === modules[1].id)?.id ?? null },
      { userId: explorer.id, moduleId: modules[2].id, sectionId: sectionsByModule.find((s) => s.moduleId === modules[2].id)?.id ?? null },
    ],
  });

  const quizList = await prisma.quiz.findMany({
    where: { type: "module" },
    include: { questions: { include: { options: true }, orderBy: { orderIndex: "asc" } }, module: true },
    orderBy: { createdAt: "asc" },
  });

  async function createAttemptForUser(userId: string, quizId: string, scoreTarget: number, startedAt: Date) {
    const quiz = quizList.find((item) => item.id === quizId);
    if (!quiz) return;

    const totalQuestions = quiz.questions.length;
    const correctNeeded = Math.max(0, Math.min(totalQuestions, Math.round((scoreTarget / 100) * totalQuestions)));

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        totalQuestions,
        correctAnswers: correctNeeded,
        score: (correctNeeded / totalQuestions) * 100,
        startedAt,
        completedAt: new Date(startedAt.getTime() + 8 * 60 * 1000),
        timeSpentSeconds: 480,
      },
    });

    for (const [index, question] of quiz.questions.entries()) {
      const correctOption = question.options.find((option) => option.isCorrect);
      const wrongOption = question.options.find((option) => !option.isCorrect);
      const shouldBeCorrect = index < correctNeeded;
      const selectedOption = shouldBeCorrect ? correctOption : wrongOption;

      await prisma.userAnswer.create({
        data: {
          quizAttemptId: attempt.id,
          questionId: question.id,
          selectedOptionId: selectedOption?.id ?? null,
          isCorrect: shouldBeCorrect,
          answeredAt: new Date(startedAt.getTime() + (index + 1) * 60 * 1000),
        },
      });
    }
  }

  const historyQuizId = quizzes.history;
  const volcanoQuizId = quizzes.volcano;
  const cultureQuizId = quizzes.culture;

  if (historyQuizId && volcanoQuizId && cultureQuizId) {
    await createAttemptForUser(student.id, historyQuizId, 83, new Date("2026-05-20T10:00:00.000Z"));
    await createAttemptForUser(student.id, volcanoQuizId, 67, new Date("2026-05-24T10:00:00.000Z"));
    await createAttemptForUser(student.id, cultureQuizId, 50, new Date("2026-05-28T10:00:00.000Z"));

    await createAttemptForUser(explorer.id, historyQuizId, 100, new Date("2026-05-18T10:00:00.000Z"));
    await createAttemptForUser(explorer.id, volcanoQuizId, 83, new Date("2026-05-22T10:00:00.000Z"));
    await createAttemptForUser(explorer.id, cultureQuizId, 83, new Date("2026-05-27T10:00:00.000Z"));
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
