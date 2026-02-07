import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, convertMillimetersToTwip } from 'docx';
import type { CVData } from '../types/cv.types';
import { generateCVFilename } from './filenameUtils';
import { mapCVDataForExport } from './cvDataMapper';
import { EXPORT_STRINGS } from '../data/constants';


export const exportToDocx = async (data: CVData) => {
    const fileName = generateCVFilename(data.personalInfo);
    const mappedData = mapCVDataForExport(data);
    const sections = [];

    // Header
    sections.push(
        new Paragraph({
            text: mappedData.personal.name,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
        })
    );

    if (mappedData.personal.title) {
        sections.push(
            new Paragraph({
                text: mappedData.personal.title,
                alignment: AlignmentType.CENTER,
            })
        );
    }

    if (mappedData.personal.contactInfo) {
        sections.push(
            new Paragraph({
                text: mappedData.personal.contactInfo,
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
            })
        );
    }

    // Summary
    if (mappedData.summary) {
        sections.push(new Paragraph({ text: EXPORT_STRINGS.sections.professionalSummary, heading: HeadingLevel.HEADING_2 }));
        sections.push(new Paragraph({ text: mappedData.summary, spacing: { after: 300 } }));
    }

    // Experience
    if (mappedData.experience.length > 0) {
        sections.push(new Paragraph({ text: EXPORT_STRINGS.sections.professionalExperience, heading: HeadingLevel.HEADING_2 }));
        mappedData.experience.forEach((exp: any) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${exp.position} - ${exp.company}`, bold: true }),
                        new TextRun({
                            text: `\t${exp.dateRange}`,
                            bold: true
                        }),
                    ],
                    tabStops: [{ type: 'right', position: 9000 }],
                })
            );
            exp.responsibilities.forEach((resp: string) => {
                sections.push(new Paragraph({ text: `• ${resp}`, indent: { left: 720 } }));
            });
            sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
        });
    }

    // Education
    if (mappedData.education.length > 0) {
        sections.push(new Paragraph({ text: EXPORT_STRINGS.sections.education, heading: HeadingLevel.HEADING_2 }));
        mappedData.education.forEach((edu: any) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''} - ${edu.school}`, bold: true }),
                        new TextRun({
                            text: `\t${edu.dateRange}`,
                            bold: true
                        }),
                    ],
                    tabStops: [{ type: 'right', position: 9000 }],
                })
            );
            sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
        });
    }

    // Skills
    if (mappedData.skills.length > 0) {
        sections.push(new Paragraph({ text: EXPORT_STRINGS.sections.technicalSkills, heading: HeadingLevel.HEADING_2 }));
        mappedData.skills.forEach((skillCat: any) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${skillCat.categoryName}: `, bold: true }),
                        new TextRun({ text: skillCat.skillList }),
                    ]
                })
            );
        });
        sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
    }

    // Certifications
    if (mappedData.certifications.length > 0) {
        sections.push(new Paragraph({ text: EXPORT_STRINGS.sections.certifications, heading: HeadingLevel.HEADING_2 }));
        mappedData.certifications.forEach((cert: any) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${cert.name} - ${cert.issuer}`, bold: true }),
                        new TextRun({ text: `\t${cert.date}`, bold: true }),
                    ],
                    tabStops: [{ type: 'right', position: 9000 }],
                })
            );
        });
    }

    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: convertMillimetersToTwip(20),
                        bottom: convertMillimetersToTwip(20),
                        left: convertMillimetersToTwip(20),
                        right: convertMillimetersToTwip(20),
                    },
                    size: {
                        width: convertMillimetersToTwip(210),
                        height: convertMillimetersToTwip(297),
                    },
                },
            },
            children: sections,
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName + '.docx');
};
