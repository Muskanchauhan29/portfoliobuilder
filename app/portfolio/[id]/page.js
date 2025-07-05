import { notFound } from 'next/navigation';
import React from "react";
import PortfolioClient from "@/components/PortfolioClient";
import PortfolioNavbar from "@/components/PortfolioNavbar";
import ContactInfoRow from "@/components/ContactInfoRow";
import dynamic from "next/dynamic";
const FadeInWhenVisible = dynamic(() => import("@/components/FadeInWhenVisible"), { ssr: false });
import { connectToDatabase } from '@/utils/db';
import TypewriterText from '@/components/TypewriterText';
import { motion } from 'framer-motion';

export default async function PortfolioPage({ params }) {
  const { id } = params;
  let portfolio = null;

  try {
    const { db } = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    portfolio = await db.collection('portfolios').findOne({ _id: new ObjectId(id) });
  } catch (e) {
    return notFound();
  }

  if (!portfolio) return notFound();
  const { personalInfo = {}, projects = [], skills = [], education = [], experience = [], ownerId } = portfolio;

  return (
    <PortfolioClient
      personalInfo={personalInfo}
      projects={projects}
      skills={skills}
      education={education}
      experience={experience}
      ownerId={ownerId ? ownerId.toString() : ''}
    />
  );
}

