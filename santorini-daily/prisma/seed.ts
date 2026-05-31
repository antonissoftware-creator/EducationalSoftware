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
        descriptionEn: "Discover Santorini from mythology to ancient settlements.",
        descriptionEl: "Ανακάλυψε τη Σαντορίνη από τη μυθολογία έως τους αρχαίους οικισμούς.",
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
        descriptionEn: "Understand the volcanic forces that shaped the island.",
        descriptionEl: "Κατανόησε τις ηφαιστειακές δυνάμεις που διαμόρφωσαν το νησί.",
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
        descriptionEn: "Explore villages, architecture, and local traditions.",
        descriptionEl: "Εξερεύνησε χωριά, αρχιτεκτονική και τοπικές παραδόσεις.",
        orderIndex: 3,
        difficulty: "intermediate",
        estimatedMinutes: 35,
      },
    }),
  ]);

  for (const [i, module] of modules.entries()) {
    await prisma.moduleSection.createMany({
      data: [1, 2, 3].map((sectionOrder) => ({
        moduleId: module.id,
        orderIndex: sectionOrder,
        mediaType: "image",
        mediaUrl: null,
        titleEn: `Section ${sectionOrder}`,
        titleEl: `Ενότητα ${sectionOrder}`,
        contentEn: `Learning content for ${module.slug} section ${sectionOrder}.`,
        contentEl: `Εκπαιδευτικό περιεχόμενο για ${module.slug} ενότητα ${sectionOrder}.`,
      })),
    });

    const quiz = await prisma.quiz.create({
      data: {
        moduleId: module.id,
        titleEn: `${module.titleEn} Quiz`,
        titleEl: `Κουίζ: ${module.titleEl}`,
        type: "module",
      },
    });

    for (let q = 1; q <= 5; q += 1) {
      const question = await prisma.question.create({
        data: {
          quizId: quiz.id,
          questionEn: `Question ${q} for ${module.slug}?`,
          questionEl: `Ερώτηση ${q} για ${module.slug};`,
          type: q % 2 === 0 ? "true_false" : "multiple_choice",
          category: i === 0 ? "history" : i === 1 ? "volcano" : "villages",
          difficulty: "beginner",
          explanationEn: "Review module material for the rationale.",
          explanationEl: "Δες το υλικό της ενότητας για την εξήγηση.",
          orderIndex: q,
        },
      });

      await prisma.questionOption.createMany({
        data: [
          { questionId: question.id, textEn: "Option A", textEl: "Επιλογή Α", isCorrect: true, orderIndex: 1 },
          { questionId: question.id, textEn: "Option B", textEl: "Επιλογή Β", isCorrect: false, orderIndex: 2 },
          { questionId: question.id, textEn: "Option C", textEl: "Επιλογή Γ", isCorrect: false, orderIndex: 3 },
          { questionId: question.id, textEn: "Option D", textEl: "Επιλογή Δ", isCorrect: false, orderIndex: 4 },
        ],
      });
    }
  }

  await prisma.quiz.create({
    data: {
      titleEn: "Santorini Final Review",
      titleEl: "Τελική Ανασκόπηση Σαντορίνης",
      type: "final",
      questions: {
        create: Array.from({ length: 9 }).map((_, idx) => ({
          questionEn: `Final mixed question ${idx + 1}?`,
          questionEl: `Τελική μικτή ερώτηση ${idx + 1};`,
          type: "multiple_choice",
          category: idx < 3 ? "history" : idx < 6 ? "volcano" : "villages",
          difficulty: "intermediate",
          explanationEn: "Mixed review explanation.",
          explanationEl: "Εξήγηση μεικτής αξιολόγησης.",
          orderIndex: idx + 1,
          options: {
            create: [
              { textEn: "Correct", textEl: "Σωστό", isCorrect: true, orderIndex: 1 },
              { textEn: "Wrong 1", textEl: "Λάθος 1", isCorrect: false, orderIndex: 2 },
              { textEn: "Wrong 2", textEl: "Λάθος 2", isCorrect: false, orderIndex: 3 },
              { textEn: "Wrong 3", textEl: "Λάθος 3", isCorrect: false, orderIndex: 4 },
            ],
          },
        })),
      },
    },
  });

  await prisma.place.createMany({
    data: [
      {
        titleEn: "Akrotiri",
        titleEl: "Ακρωτήρι",
        descriptionEn: "Bronze Age excavation site.",
        descriptionEl: "Αρχαιολογικός χώρος της Εποχής του Χαλκού.",
        category: "history",
        latitude: 36.3527,
        longitude: 25.403,
      },
      {
        titleEn: "Nea Kameni",
        titleEl: "Νέα Καμένη",
        descriptionEn: "Volcanic island in the caldera.",
        descriptionEl: "Ηφαιστειακή νησίδα στην καλντέρα.",
        category: "volcano",
        latitude: 36.4018,
        longitude: 25.3964,
      },
      {
        titleEn: "Oia",
        titleEl: "Οία",
        descriptionEn: "Traditional village with iconic architecture.",
        descriptionEl: "Παραδοσιακό χωριό με εμβληματική αρχιτεκτονική.",
        category: "villages",
        latitude: 36.4618,
        longitude: 25.3753,
      },
    ],
  });

  const passwordHash = await bcrypt.hash("Password123!", 10);
  const user = await prisma.user.create({
    data: {
      email: "student@santorini.local",
      passwordHash,
      name: "Sample Student",
      preferredLanguage: "en",
      settings: {
        create: {
          aiEnabled: false,
          language: "en",
        },
      },
    },
  });

  await prisma.progress.createMany({
    data: modules.map((module, idx) => ({
      userId: user.id,
      moduleId: module.id,
      completedSections: idx,
      completionPercentage: idx * 33,
      isCompleted: idx === 2,
    })),
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
