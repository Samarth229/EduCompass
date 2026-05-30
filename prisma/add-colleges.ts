import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

interface NewCollege {
  name: string
  city: string
  state: string
  type: string
  nirfRank: number
  nirfScore: number
  fees: number
  rating: number
  established: number
  description: string
  website: string
  field: string
  courses: { name: string; duration: number; seats: number; fees: number }[]
  placement: { avgPackage: number; highestPackage: number; placementPercent: number; topRecruiters: string }
  predictorData: { exam: string; category: string; openingRank: number; closingRank: number }[]
}

const newColleges: NewCollege[] = [
  {
    name: 'Indian Institute of Technology (ISM) Dhanbad',
    city: 'Dhanbad', state: 'Jharkhand', type: 'Government',
    nirfRank: 15, nirfScore: 64.83, fees: 218000, rating: 4.4,
    established: 1926,
    description: 'One of the oldest engineering institutes in India, known for mining, petroleum, and computer science excellence.',
    website: 'https://www.iitism.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 70, fees: 218000 },
      { name: 'B.Tech Mining Engineering', duration: 4, seats: 60, fees: 218000 },
      { name: 'B.Tech Petroleum Engineering', duration: 4, seats: 50, fees: 218000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 55, fees: 218000 },
    ],
    placement: { avgPackage: 18, highestPackage: 75, placementPercent: 85, topRecruiters: 'Coal India,ONGC,TCS,Infosys,Amazon' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 1500, closingRank: 6000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 3000, closingRank: 9000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 6000, closingRank: 15000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Indore',
    city: 'Indore', state: 'Madhya Pradesh', type: 'Government',
    nirfRank: 16, nirfScore: 64.72, fees: 215000, rating: 4.4,
    established: 2009,
    description: 'A young and dynamic IIT known for interdisciplinary research and strong CS programs.',
    website: 'https://www.iiti.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 60, fees: 215000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 50, fees: 215000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 50, fees: 215000 },
    ],
    placement: { avgPackage: 20, highestPackage: 82, placementPercent: 87, topRecruiters: 'Microsoft,Google,Amazon,Samsung,Qualcomm' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 1800, closingRank: 6500 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 3500, closingRank: 10000 },
      { exam: 'JEE_ADVANCED', category: 'EWS', openingRank: 2500, closingRank: 8000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Gandhinagar',
    city: 'Gandhinagar', state: 'Gujarat', type: 'Government',
    nirfRank: 18, nirfScore: 63.42, fees: 220000, rating: 4.4,
    established: 2008,
    description: 'Innovative IIT with unique liberal arts integration and strong research culture.',
    website: 'https://www.iitgn.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 55, fees: 220000 },
      { name: 'B.Tech Chemical Engineering', duration: 4, seats: 45, fees: 220000 },
      { name: 'B.Tech Materials Science', duration: 4, seats: 40, fees: 220000 },
    ],
    placement: { avgPackage: 19, highestPackage: 78, placementPercent: 86, topRecruiters: 'Google,Flipkart,Amazon,Bosch,ISRO' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 2000, closingRank: 7000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 4000, closingRank: 11000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 8000, closingRank: 18000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Ropar',
    city: 'Rupnagar', state: 'Punjab', type: 'Government',
    nirfRank: 22, nirfScore: 61.56, fees: 210000, rating: 4.3,
    established: 2008,
    description: 'A growing IIT known for research in biomedical engineering and sustainable technologies.',
    website: 'https://www.iitrpr.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 50, fees: 210000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 40, fees: 210000 },
      { name: 'B.Tech Biomedical Engineering', duration: 4, seats: 35, fees: 210000 },
    ],
    placement: { avgPackage: 17, highestPackage: 65, placementPercent: 84, topRecruiters: 'Microsoft,Amazon,TCS,Infosys,Oracle' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 2500, closingRank: 8000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 5000, closingRank: 13000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 9000, closingRank: 20000 },
    ],
  },
  {
    name: 'Siksha O Anusandhan',
    city: 'Bhubaneswar', state: 'Odisha', type: 'Deemed',
    nirfRank: 26, nirfScore: 60.97, fees: 180000, rating: 4.0,
    established: 1996,
    description: 'Multi-disciplinary deemed university with strong engineering and medical programs in Odisha.',
    website: 'https://soa.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 200, fees: 180000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 150, fees: 180000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 120, fees: 180000 },
    ],
    placement: { avgPackage: 6, highestPackage: 22, placementPercent: 68, topRecruiters: 'TCS,Wipro,Infosys,HCL,Cognizant' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 40000, closingRank: 120000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 60000, closingRank: 160000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 80000, closingRank: 200000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Jodhpur',
    city: 'Jodhpur', state: 'Rajasthan', type: 'Government',
    nirfRank: 28, nirfScore: 60.61, fees: 215000, rating: 4.3,
    established: 2008,
    description: 'IIT Jodhpur focuses on AI, data science and desert-tech innovation in the Thar region.',
    website: 'https://iitj.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 55, fees: 215000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 45, fees: 215000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 45, fees: 215000 },
    ],
    placement: { avgPackage: 17, highestPackage: 68, placementPercent: 83, topRecruiters: 'Amazon,Google,Adobe,Infosys,TCS' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 3000, closingRank: 9000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 6000, closingRank: 14000 },
      { exam: 'JEE_ADVANCED', category: 'EWS', openingRank: 4000, closingRank: 11000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Mandi',
    city: 'Mandi', state: 'Himachal Pradesh', type: 'Government',
    nirfRank: 31, nirfScore: 59.86, fees: 210000, rating: 4.2,
    established: 2009,
    description: 'Scenic Himalayan IIT known for sustainable engineering and disaster management research.',
    website: 'https://www.iitmandi.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 50, fees: 210000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 40, fees: 210000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 40, fees: 210000 },
    ],
    placement: { avgPackage: 15, highestPackage: 60, placementPercent: 82, topRecruiters: 'Microsoft,Cisco,Amazon,DRDO,Infosys' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 3500, closingRank: 10000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 7000, closingRank: 16000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 12000, closingRank: 25000 },
    ],
  },
  {
    name: 'Aligarh Muslim University',
    city: 'Aligarh', state: 'Uttar Pradesh', type: 'Government',
    nirfRank: 33, nirfScore: 59.16, fees: 30000, rating: 3.9,
    established: 1875,
    description: 'Historic central university with strong engineering faculty and vibrant campus traditions.',
    website: 'https://www.amu.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Engineering', duration: 4, seats: 80, fees: 30000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 70, fees: 30000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 75, fees: 30000 },
    ],
    placement: { avgPackage: 7, highestPackage: 28, placementPercent: 70, topRecruiters: 'TCS,Wipro,Infosys,HCL,IBM' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 8000, closingRank: 28000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 12000, closingRank: 40000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 18000, closingRank: 55000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Patna',
    city: 'Patna', state: 'Bihar', type: 'Government',
    nirfRank: 34, nirfScore: 58.40, fees: 208000, rating: 4.2,
    established: 2008,
    description: 'IIT Patna is a rapidly growing institute with strong focus on research and industry collaboration.',
    website: 'https://www.iitp.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 55, fees: 208000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 45, fees: 208000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 40, fees: 208000 },
    ],
    placement: { avgPackage: 16, highestPackage: 62, placementPercent: 82, topRecruiters: 'Amazon,Google,Flipkart,Juspay,TCS' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 4000, closingRank: 11000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 8000, closingRank: 17000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 14000, closingRank: 28000 },
    ],
  },
  {
    name: 'Koneru Lakshmaiah Education Foundation University',
    city: 'Vaddeswaram', state: 'Andhra Pradesh', type: 'Deemed',
    nirfRank: 35, nirfScore: 58.24, fees: 200000, rating: 3.9,
    established: 1980,
    description: 'K L University is a top-ranked deemed university in AP with strong placements and industry ties.',
    website: 'https://www.kluniversity.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 350, fees: 200000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 200, fees: 200000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 120, fees: 200000 },
    ],
    placement: { avgPackage: 7, highestPackage: 28, placementPercent: 72, topRecruiters: 'TCS,Infosys,Wipro,HCL,Cognizant' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 30000, closingRank: 90000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 45000, closingRank: 120000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 60000, closingRank: 150000 },
    ],
  },
  {
    name: 'Kalasalingam Academy of Research and Education',
    city: 'Srivilliputhur', state: 'Tamil Nadu', type: 'Deemed',
    nirfRank: 36, nirfScore: 58.20, fees: 160000, rating: 3.8,
    established: 1984,
    description: 'Deemed university in Tamil Nadu known for research output and engineering education.',
    website: 'https://www.kalasalingam.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 150, fees: 160000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 100, fees: 160000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 80, fees: 160000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 63, topRecruiters: 'TCS,Wipro,Infosys,CTS,HCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 50000, closingRank: 140000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 70000, closingRank: 180000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 90000, closingRank: 220000 },
    ],
  },
  {
    name: 'Visvesvaraya National Institute of Technology Nagpur',
    city: 'Nagpur', state: 'Maharashtra', type: 'Government',
    nirfRank: 39, nirfScore: 57.89, fees: 163000, rating: 4.1,
    established: 1960,
    description: 'Top NIT in Maharashtra with strong civil, mechanical and electronics engineering programs.',
    website: 'https://vnit.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 90, fees: 163000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 85, fees: 163000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 80, fees: 163000 },
    ],
    placement: { avgPackage: 10, highestPackage: 40, placementPercent: 80, topRecruiters: 'TCS,Infosys,L&T,Capgemini,Persistent' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 7000, closingRank: 22000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 10000, closingRank: 32000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 16000, closingRank: 48000 },
    ],
  },
  {
    name: 'National Institute of Technology Silchar',
    city: 'Silchar', state: 'Assam', type: 'Government',
    nirfRank: 40, nirfScore: 57.60, fees: 153000, rating: 3.9,
    established: 1967,
    description: 'Leading NIT in Northeast India with quality engineering education and growing research output.',
    website: 'https://www.nits.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 80, fees: 153000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 70, fees: 153000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 65, fees: 153000 },
    ],
    placement: { avgPackage: 7, highestPackage: 26, placementPercent: 70, topRecruiters: 'TCS,Infosys,Wipro,OIL India,BPCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 12000, closingRank: 38000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 18000, closingRank: 52000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 25000, closingRank: 68000 },
    ],
  },
  {
    name: 'Institute of Chemical Technology',
    city: 'Mumbai', state: 'Maharashtra', type: 'Deemed',
    nirfRank: 41, nirfScore: 56.93, fees: 120000, rating: 4.2,
    established: 1933,
    description: 'Premier institute for chemical technology, pharma and food technology with industry-oriented curriculum.',
    website: 'https://www.ictmumbai.edu.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Chemical Engineering', duration: 4, seats: 80, fees: 120000 },
      { name: 'B.Tech Pharmaceutical Chemistry', duration: 4, seats: 60, fees: 120000 },
      { name: 'B.Tech Food Engineering', duration: 4, seats: 50, fees: 120000 },
    ],
    placement: { avgPackage: 9, highestPackage: 35, placementPercent: 80, topRecruiters: 'Reliance,BASF,Asian Paints,Pfizer,Dr.Reddys' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 6000, closingRank: 20000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 9000, closingRank: 30000 },
      { exam: 'MHT_CET', category: 'GENERAL', openingRank: 500, closingRank: 3000 },
    ],
  },
  {
    name: 'Malaviya National Institute of Technology',
    city: 'Jaipur', state: 'Rajasthan', type: 'Government',
    nirfRank: 43, nirfScore: 56.35, fees: 158000, rating: 4.0,
    established: 1963,
    description: 'Top NIT in Rajasthan with strong engineering programs and excellent industry connections.',
    website: 'https://www.mnit.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 90, fees: 158000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 80, fees: 158000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 75, fees: 158000 },
    ],
    placement: { avgPackage: 9, highestPackage: 36, placementPercent: 78, topRecruiters: 'TCS,Wipro,Infosys,Amazon,Deloitte' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 8000, closingRank: 25000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 12000, closingRank: 36000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 18000, closingRank: 50000 },
    ],
  },
  {
    name: 'National Institute of Technology Delhi',
    city: 'Delhi', state: 'Delhi', type: 'Government',
    nirfRank: 45, nirfScore: 55.67, fees: 155000, rating: 3.9,
    established: 2010,
    description: 'Newest NIT in Delhi with rapidly growing infrastructure and strong placement records.',
    website: 'https://nitdelhi.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 70, fees: 155000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 60, fees: 155000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 55, fees: 155000 },
    ],
    placement: { avgPackage: 8, highestPackage: 32, placementPercent: 75, topRecruiters: 'TCS,Infosys,Wipro,Amazon,HCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 10000, closingRank: 32000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 15000, closingRank: 45000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 22000, closingRank: 60000 },
    ],
  },
  {
    name: 'Sri Sivasubramaniya Nadar College of Engineering',
    city: 'Kalavakkam', state: 'Tamil Nadu', type: 'Private',
    nirfRank: 46, nirfScore: 55.01, fees: 170000, rating: 4.0,
    established: 1996,
    description: 'Autonomous engineering college near Chennai with strong industry connections and placements.',
    website: 'https://www.ssn.edu.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 120, fees: 170000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 100, fees: 170000 },
      { name: 'B.Tech Information Technology', duration: 4, seats: 90, fees: 170000 },
    ],
    placement: { avgPackage: 7, highestPackage: 28, placementPercent: 76, topRecruiters: 'TCS,Infosys,Zoho,Freshworks,HCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 30000, closingRank: 85000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 45000, closingRank: 110000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 60000, closingRank: 140000 },
    ],
  },
  {
    name: 'Indian Institute of Engineering Science and Technology Shibpur',
    city: 'Howrah', state: 'West Bengal', type: 'Government',
    nirfRank: 49, nirfScore: 54.17, fees: 50000, rating: 3.9,
    established: 1856,
    description: 'One of the oldest technical institutes in Asia with strong civil and mechanical traditions.',
    website: 'https://www.iiest.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 60, fees: 50000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 80, fees: 50000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 75, fees: 50000 },
    ],
    placement: { avgPackage: 7, highestPackage: 26, placementPercent: 72, topRecruiters: 'TCS,Wipro,L&T,Infosys,WBSETCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 10000, closingRank: 32000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 15000, closingRank: 46000 },
      { exam: 'WBJEE', category: 'GENERAL', openingRank: 500, closingRank: 3000 },
    ],
  },
  {
    name: 'Indian Institute of Space Science and Technology',
    city: 'Thiruvananthapuram', state: 'Kerala', type: 'Government',
    nirfRank: 51, nirfScore: 53.13, fees: 75000, rating: 4.3,
    established: 2007,
    description: 'Unique ISRO-affiliated institute specializing in aerospace engineering and space technology.',
    website: 'https://www.iist.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Aerospace Engineering', duration: 4, seats: 50, fees: 75000 },
      { name: 'B.Tech Avionics', duration: 4, seats: 40, fees: 75000 },
      { name: 'B.Tech Engineering Physics', duration: 4, seats: 30, fees: 75000 },
    ],
    placement: { avgPackage: 14, highestPackage: 50, placementPercent: 90, topRecruiters: 'ISRO,HAL,DRDO,Boeing,Airbus' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 3000, closingRank: 9000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 6000, closingRank: 15000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 10000, closingRank: 22000 },
    ],
  },
  {
    name: 'Graphic Era University',
    city: 'Dehradun', state: 'Uttarakhand', type: 'Deemed',
    nirfRank: 52, nirfScore: 52.96, fees: 180000, rating: 3.8,
    established: 1993,
    description: 'Well-known private university in Dehradun with strong IT and engineering programs.',
    website: 'https://www.geu.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 250, fees: 180000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 150, fees: 180000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 100, fees: 180000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 63, topRecruiters: 'TCS,Wipro,Infosys,HCL,Capgemini' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 55000, closingRank: 160000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 75000, closingRank: 200000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 95000, closingRank: 240000 },
    ],
  },
  {
    name: 'Saveetha Institute of Medical and Technical Sciences',
    city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed',
    nirfRank: 53, nirfScore: 52.85, fees: 250000, rating: 3.7,
    established: 1988,
    description: 'Large deemed university in Chennai offering diverse engineering and medical programs.',
    website: 'https://www.saveetha.com', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 300, fees: 250000 },
      { name: 'B.Tech Biomedical Engineering', duration: 4, seats: 100, fees: 250000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 150, fees: 250000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 60, topRecruiters: 'TCS,Wipro,Infosys,CTS,IBM' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 60000, closingRank: 180000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 80000, closingRank: 220000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 100000, closingRank: 260000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Bhubaneswar',
    city: 'Bhubaneswar', state: 'Odisha', type: 'Government',
    nirfRank: 54, nirfScore: 52.54, fees: 205000, rating: 4.1,
    established: 2008,
    description: 'Growing IIT in Odisha with focus on interdisciplinary research and modern campus.',
    website: 'https://www.iitbbs.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 50, fees: 205000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 40, fees: 205000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 40, fees: 205000 },
    ],
    placement: { avgPackage: 14, highestPackage: 55, placementPercent: 80, topRecruiters: 'Amazon,Flipkart,Samsung,Infosys,TCS' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 4500, closingRank: 12000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 9000, closingRank: 18000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 15000, closingRank: 30000 },
    ],
  },
  {
    name: 'Dr. B R Ambedkar National Institute of Technology Jalandhar',
    city: 'Jalandhar', state: 'Punjab', type: 'Government',
    nirfRank: 58, nirfScore: 51.11, fees: 153000, rating: 3.9,
    established: 1987,
    description: 'NIT in Punjab with strong engineering programs and good placement record.',
    website: 'https://www.nitj.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 80, fees: 153000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 70, fees: 153000 },
      { name: 'B.Tech Textile Technology', duration: 4, seats: 50, fees: 153000 },
    ],
    placement: { avgPackage: 7, highestPackage: 28, placementPercent: 72, topRecruiters: 'TCS,Wipro,Infosys,IBM,Capgemini' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 14000, closingRank: 42000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 20000, closingRank: 58000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 28000, closingRank: 75000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Tirupati',
    city: 'Tirupati', state: 'Andhra Pradesh', type: 'Government',
    nirfRank: 61, nirfScore: 50.58, fees: 200000, rating: 4.0,
    established: 2015,
    description: 'New-generation IIT in Andhra Pradesh with modern facilities and growing research profile.',
    website: 'https://www.iittp.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 45, fees: 200000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 35, fees: 200000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 35, fees: 200000 },
    ],
    placement: { avgPackage: 12, highestPackage: 48, placementPercent: 78, topRecruiters: 'Amazon,TCS,Infosys,Wipro,Capgemini' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 5000, closingRank: 14000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 10000, closingRank: 20000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 16000, closingRank: 32000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Jammu',
    city: 'Jammu', state: 'Jammu and Kashmir', type: 'Government',
    nirfRank: 62, nirfScore: 50.53, fees: 200000, rating: 4.0,
    established: 2016,
    description: 'Newly established IIT in J&K contributing to higher technical education in the region.',
    website: 'https://www.iitjammu.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 40, fees: 200000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 35, fees: 200000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 35, fees: 200000 },
    ],
    placement: { avgPackage: 12, highestPackage: 45, placementPercent: 76, topRecruiters: 'TCS,Amazon,Infosys,Wipro,DRDO' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 5500, closingRank: 15000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 11000, closingRank: 22000 },
      { exam: 'JEE_ADVANCED', category: 'EWS', openingRank: 7000, closingRank: 18000 },
    ],
  },
  {
    name: 'Defence Institute of Advanced Technology',
    city: 'Pune', state: 'Maharashtra', type: 'Deemed',
    nirfRank: 63, nirfScore: 50.37, fees: 80000, rating: 4.0,
    established: 1952,
    description: 'Unique defence-affiliated deemed university specializing in advanced defence technologies.',
    website: 'https://www.diat.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 40, fees: 80000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 40, fees: 80000 },
      { name: 'M.Tech Missile Systems', duration: 2, seats: 30, fees: 90000 },
    ],
    placement: { avgPackage: 9, highestPackage: 30, placementPercent: 80, topRecruiters: 'DRDO,HAL,BEL,ISRO,Bharat Forge' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 15000, closingRank: 50000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 22000, closingRank: 70000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 30000, closingRank: 90000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Palakkad',
    city: 'Palakkad', state: 'Kerala', type: 'Government',
    nirfRank: 64, nirfScore: 50.24, fees: 200000, rating: 4.0,
    established: 2015,
    description: 'Newer IIT in Kerala with growing focus on sustainable engineering and core research.',
    website: 'https://www.iitpkd.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 40, fees: 200000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 35, fees: 200000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 35, fees: 200000 },
    ],
    placement: { avgPackage: 12, highestPackage: 45, placementPercent: 77, topRecruiters: 'TCS,Infosys,Amazon,UST Global,KPMG' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 5500, closingRank: 14500 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 11000, closingRank: 22000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 17000, closingRank: 32000 },
    ],
  },
  {
    name: 'Sathyabama Institute of Science and Technology',
    city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed',
    nirfRank: 66, nirfScore: 50.05, fees: 200000, rating: 3.7,
    established: 1987,
    description: 'Deemed university in Chennai with strong engineering programs and satellite research lab.',
    website: 'https://www.sathyabama.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 250, fees: 200000 },
      { name: 'B.Tech Aerospace Engineering', duration: 4, seats: 80, fees: 200000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 150, fees: 200000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 62, topRecruiters: 'TCS,Wipro,CTS,HCL,Infosys' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 55000, closingRank: 160000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 75000, closingRank: 200000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 95000, closingRank: 240000 },
    ],
  },
  {
    name: 'National Institute of Technology Meghalaya',
    city: 'Shillong', state: 'Meghalaya', type: 'Government',
    nirfRank: 68, nirfScore: 49.82, fees: 150000, rating: 3.8,
    established: 2010,
    description: 'NIT in Northeast India serving the engineering education needs of Meghalaya and surrounding states.',
    website: 'https://nitm.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 60, fees: 150000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 55, fees: 150000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 50, fees: 150000 },
    ],
    placement: { avgPackage: 6, highestPackage: 20, placementPercent: 65, topRecruiters: 'TCS,Wipro,Infosys,HCL,BSNL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 18000, closingRank: 55000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 26000, closingRank: 75000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 35000, closingRank: 95000 },
    ],
  },
  {
    name: 'National Institute of Technology Raipur',
    city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
    nirfRank: 71, nirfScore: 48.88, fees: 151000, rating: 3.8,
    established: 1956,
    description: 'NIT in Chhattisgarh with strong mining and mechanical engineering programs.',
    website: 'https://www.nitrr.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 75, fees: 151000 },
      { name: 'B.Tech Mining Engineering', duration: 4, seats: 60, fees: 151000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 70, fees: 151000 },
    ],
    placement: { avgPackage: 6, highestPackage: 22, placementPercent: 68, topRecruiters: 'SAIL,Coal India,TCS,Wipro,Infosys' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 18000, closingRank: 55000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 26000, closingRank: 75000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 35000, closingRank: 95000 },
    ],
  },
  {
    name: 'Maulana Azad National Institute of Technology',
    city: 'Bhopal', state: 'Madhya Pradesh', type: 'Government',
    nirfRank: 72, nirfScore: 48.86, fees: 152000, rating: 3.9,
    established: 1960,
    description: 'NIT in Madhya Pradesh offering quality engineering education with strong alumni network.',
    website: 'https://www.manit.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 80, fees: 152000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 70, fees: 152000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 75, fees: 152000 },
    ],
    placement: { avgPackage: 7, highestPackage: 26, placementPercent: 70, topRecruiters: 'TCS,Wipro,Infosys,HCL,BHEL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 16000, closingRank: 50000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 24000, closingRank: 68000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 32000, closingRank: 88000 },
    ],
  },
  {
    name: 'Indian Institute of Technology Bhilai',
    city: 'Raipur', state: 'Chhattisgarh', type: 'Government',
    nirfRank: 73, nirfScore: 48.80, fees: 200000, rating: 3.9,
    established: 2016,
    description: 'One of the newest IITs offering engineering programs in central India.',
    website: 'https://www.iitbhilai.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 35, fees: 200000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 30, fees: 200000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 30, fees: 200000 },
    ],
    placement: { avgPackage: 11, highestPackage: 42, placementPercent: 74, topRecruiters: 'Amazon,TCS,Infosys,Wipro,DRDO' },
    predictorData: [
      { exam: 'JEE_ADVANCED', category: 'GENERAL', openingRank: 6000, closingRank: 16000 },
      { exam: 'JEE_ADVANCED', category: 'OBC', openingRank: 12000, closingRank: 24000 },
      { exam: 'JEE_ADVANCED', category: 'SC', openingRank: 18000, closingRank: 35000 },
    ],
  },
  {
    name: 'International Institute of Information Technology Bangalore',
    city: 'Bengaluru', state: 'Karnataka', type: 'Deemed',
    nirfRank: 74, nirfScore: 48.61, fees: 290000, rating: 4.0,
    established: 1999,
    description: 'Research-focused IIIT in Bengaluru known for AI, robotics and computational biology.',
    website: 'https://www.iiitb.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 100, fees: 290000 },
      { name: 'M.Tech Machine Learning', duration: 2, seats: 60, fees: 310000 },
      { name: 'M.Tech Data Science', duration: 2, seats: 50, fees: 310000 },
    ],
    placement: { avgPackage: 14, highestPackage: 55, placementPercent: 88, topRecruiters: 'Google,Amazon,Microsoft,Flipkart,Goldman Sachs' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 5000, closingRank: 18000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 8000, closingRank: 28000 },
      { exam: 'KCET', category: 'GENERAL', openingRank: 200, closingRank: 1500 },
    ],
  },
  {
    name: 'Sant Longowal Institute of Engineering and Technology',
    city: 'Longowal', state: 'Punjab', type: 'Government',
    nirfRank: 76, nirfScore: 48.22, fees: 110000, rating: 3.7,
    established: 1989,
    description: 'Government engineering institute in Punjab established in memory of Sant Harchand Singh Longowal.',
    website: 'https://www.sliet.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 70, fees: 110000 },
      { name: 'B.Tech Food Technology', duration: 4, seats: 50, fees: 110000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 60, fees: 110000 },
    ],
    placement: { avgPackage: 5, highestPackage: 16, placementPercent: 62, topRecruiters: 'TCS,Wipro,Infosys,Nestlé,ITC' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 22000, closingRank: 65000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 32000, closingRank: 88000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 42000, closingRank: 110000 },
    ],
  },
  {
    name: 'COEP Technological University',
    city: 'Pune', state: 'Maharashtra', type: 'Government',
    nirfRank: 77, nirfScore: 47.89, fees: 60000, rating: 3.9,
    established: 1854,
    description: 'One of Asia\'s oldest engineering colleges, upgraded to university status, with strong Pune industry ties.',
    website: 'https://www.coep.org.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Engineering', duration: 4, seats: 120, fees: 60000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 100, fees: 60000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 80, fees: 60000 },
    ],
    placement: { avgPackage: 7, highestPackage: 30, placementPercent: 74, topRecruiters: 'TCS,Infosys,Wipro,Persistent,KPIT' },
    predictorData: [
      { exam: 'MHT_CET', category: 'GENERAL', openingRank: 200, closingRank: 2000 },
      { exam: 'MHT_CET', category: 'OBC', openingRank: 500, closingRank: 4000 },
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 15000, closingRank: 48000 },
    ],
  },
  {
    name: 'Banasthali Vidyapith',
    city: 'Banasthali', state: 'Rajasthan', type: 'Deemed',
    nirfRank: 78, nirfScore: 47.86, fees: 120000, rating: 3.7,
    established: 1935,
    description: 'Women\'s deemed university in Rajasthan with strong engineering and computer science programs.',
    website: 'https://www.banasthali.org', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 200, fees: 120000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 100, fees: 120000 },
      { name: 'B.Tech Information Technology', duration: 4, seats: 120, fees: 120000 },
    ],
    placement: { avgPackage: 5, highestPackage: 16, placementPercent: 60, topRecruiters: 'TCS,Wipro,Infosys,IBM,HCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 50000, closingRank: 140000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 70000, closingRank: 180000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 90000, closingRank: 220000 },
    ],
  },
  {
    name: 'National Institute of Technology Srinagar',
    city: 'Srinagar', state: 'Jammu and Kashmir', type: 'Government',
    nirfRank: 79, nirfScore: 47.76, fees: 150000, rating: 3.7,
    established: 1960,
    description: 'NIT serving J&K with quality engineering programs in the scenic Kashmir valley.',
    website: 'https://nitsri.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 65, fees: 150000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 70, fees: 150000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 65, fees: 150000 },
    ],
    placement: { avgPackage: 6, highestPackage: 20, placementPercent: 65, topRecruiters: 'TCS,Wipro,Infosys,HCL,NTPC' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 20000, closingRank: 60000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 30000, closingRank: 82000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 40000, closingRank: 100000 },
    ],
  },
  {
    name: 'National Institute of Technology Kurukshetra',
    city: 'Kurukshetra', state: 'Haryana', type: 'Government',
    nirfRank: 81, nirfScore: 46.79, fees: 152000, rating: 3.8,
    established: 1963,
    description: 'NIT in Haryana with strong electrical and civil engineering programs.',
    website: 'https://nitkkr.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 75, fees: 152000 },
      { name: 'B.Tech Electrical Engineering', duration: 4, seats: 70, fees: 152000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 65, fees: 152000 },
    ],
    placement: { avgPackage: 7, highestPackage: 24, placementPercent: 70, topRecruiters: 'TCS,Wipro,Infosys,BHEL,NTPC' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 17000, closingRank: 52000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 25000, closingRank: 72000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 34000, closingRank: 90000 },
    ],
  },
  {
    name: 'National Institute of Technology Agartala',
    city: 'Agartala', state: 'Tripura', type: 'Government',
    nirfRank: 82, nirfScore: 46.69, fees: 148000, rating: 3.7,
    established: 1965,
    description: 'NIT in Tripura serving the engineering education needs of Northeast India.',
    website: 'https://www.nita.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 60, fees: 148000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 55, fees: 148000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 60, fees: 148000 },
    ],
    placement: { avgPackage: 5, highestPackage: 16, placementPercent: 62, topRecruiters: 'TCS,Wipro,Infosys,HCL,IBM' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 22000, closingRank: 65000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 32000, closingRank: 88000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 42000, closingRank: 108000 },
    ],
  },
  {
    name: 'Indraprastha Institute of Information Technology Delhi',
    city: 'New Delhi', state: 'Delhi', type: 'Government',
    nirfRank: 85, nirfScore: 46.32, fees: 200000, rating: 4.1,
    established: 2008,
    description: 'Research-focused IIIT in Delhi known for top CS placements and startup culture.',
    website: 'https://www.iiitd.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 120, fees: 200000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 80, fees: 200000 },
      { name: 'B.Tech Computer Science (Data Science)', duration: 4, seats: 60, fees: 200000 },
    ],
    placement: { avgPackage: 14, highestPackage: 55, placementPercent: 90, topRecruiters: 'Google,Amazon,Microsoft,Goldman Sachs,Uber' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 4000, closingRank: 14000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 7000, closingRank: 22000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 11000, closingRank: 32000 },
    ],
  },
  {
    name: 'Vel Tech Rangarajan Dr Sagunthala R&D Institute of Science and Technology',
    city: 'Chennai', state: 'Tamil Nadu', type: 'Deemed',
    nirfRank: 86, nirfScore: 46.23, fees: 170000, rating: 3.6,
    established: 1997,
    description: 'Engineering-focused deemed university in Chennai with strong industry collaboration.',
    website: 'https://www.veltech.edu.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 250, fees: 170000 },
      { name: 'B.Tech Aeronautical Engineering', duration: 4, seats: 100, fees: 170000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 120, fees: 170000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 62, topRecruiters: 'TCS,Wipro,CTS,Infosys,HCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 55000, closingRank: 160000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 75000, closingRank: 200000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 95000, closingRank: 240000 },
    ],
  },
  {
    name: 'Jawaharlal Nehru Technological University Hyderabad',
    city: 'Hyderabad', state: 'Telangana', type: 'Government',
    nirfRank: 88, nirfScore: 45.78, fees: 35000, rating: 3.7,
    established: 1972,
    description: 'Major technical university in Telangana affiliating hundreds of engineering colleges across the state.',
    website: 'https://jntuh.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 120, fees: 35000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 100, fees: 35000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 90, fees: 35000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 62, topRecruiters: 'TCS,Wipro,Infosys,HCL,Capgemini' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 25000, closingRank: 75000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 38000, closingRank: 100000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 50000, closingRank: 130000 },
    ],
  },
  {
    name: 'Guru Gobind Singh Indraprastha University',
    city: 'New Delhi', state: 'Delhi', type: 'Government',
    nirfRank: 89, nirfScore: 45.64, fees: 90000, rating: 3.7,
    established: 1998,
    description: 'Large state university in Delhi affiliating many engineering and professional colleges.',
    website: 'https://www.ipu.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 150, fees: 90000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 120, fees: 90000 },
      { name: 'B.Tech Information Technology', duration: 4, seats: 100, fees: 90000 },
    ],
    placement: { avgPackage: 6, highestPackage: 22, placementPercent: 65, topRecruiters: 'TCS,Wipro,Infosys,HCL,Cognizant' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 20000, closingRank: 62000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 30000, closingRank: 85000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 40000, closingRank: 105000 },
    ],
  },
  {
    name: 'Visvesvaraya Technological University',
    city: 'Belagavi', state: 'Karnataka', type: 'Government',
    nirfRank: 69, nirfScore: 49.80, fees: 40000, rating: 3.6,
    established: 1998,
    description: 'Largest technical university in Karnataka affiliating 200+ engineering colleges.',
    website: 'https://vtu.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 200, fees: 40000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 180, fees: 40000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 160, fees: 40000 },
    ],
    placement: { avgPackage: 5, highestPackage: 16, placementPercent: 60, topRecruiters: 'Infosys,Wipro,TCS,Mindtree,HCL' },
    predictorData: [
      { exam: 'KCET', category: 'GENERAL', openingRank: 20000, closingRank: 80000 },
      { exam: 'KCET', category: 'OBC', openingRank: 35000, closingRank: 110000 },
      { exam: 'KCET', category: 'SC', openingRank: 50000, closingRank: 140000 },
    ],
  },
  {
    name: 'Chitkara University',
    city: 'Rajpura', state: 'Punjab', type: 'Private',
    nirfRank: 94, nirfScore: 44.82, fees: 185000, rating: 3.7,
    established: 2002,
    description: 'Growing private university in Punjab known for innovation and industry-linked programs.',
    website: 'https://www.chitkara.edu.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 250, fees: 185000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 150, fees: 185000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 100, fees: 185000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 64, topRecruiters: 'TCS,Wipro,Infosys,HCL,Amazon' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 60000, closingRank: 175000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 82000, closingRank: 220000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 105000, closingRank: 260000 },
    ],
  },
  {
    name: 'C.V. Raman Global University',
    city: 'Bhubaneswar', state: 'Odisha', type: 'Deemed',
    nirfRank: 96, nirfScore: 44.55, fees: 160000, rating: 3.6,
    established: 2020,
    description: 'New deemed university in Odisha with modern infrastructure and industry-focused curriculum.',
    website: 'https://www.cgu-odisha.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 180, fees: 160000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 120, fees: 160000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 100, fees: 160000 },
    ],
    placement: { avgPackage: 4, highestPackage: 14, placementPercent: 58, topRecruiters: 'TCS,Wipro,Infosys,HCL,Capgemini' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 70000, closingRank: 200000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 95000, closingRank: 250000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 120000, closingRank: 290000 },
    ],
  },
  {
    name: 'National Institute of Technology Puducherry',
    city: 'Karaikal', state: 'Pondicherry', type: 'Government',
    nirfRank: 97, nirfScore: 44.38, fees: 148000, rating: 3.6,
    established: 2010,
    description: 'Youngest NIT offering quality engineering education in the Union Territory of Puducherry.',
    website: 'https://nitpy.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 55, fees: 148000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 50, fees: 148000 },
      { name: 'B.Tech Civil Engineering', duration: 4, seats: 45, fees: 148000 },
    ],
    placement: { avgPackage: 5, highestPackage: 16, placementPercent: 60, topRecruiters: 'TCS,Wipro,Infosys,Capgemini,HCL' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 22000, closingRank: 65000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 32000, closingRank: 88000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 42000, closingRank: 108000 },
    ],
  },
  {
    name: 'SR University',
    city: 'Warangal', state: 'Telangana', type: 'Private',
    nirfRank: 98, nirfScore: 44.29, fees: 155000, rating: 3.6,
    established: 2013,
    description: 'Growing private university in Warangal with strong focus on research and industry training.',
    website: 'https://www.sru.edu.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 200, fees: 155000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 120, fees: 155000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 100, fees: 155000 },
    ],
    placement: { avgPackage: 4, highestPackage: 14, placementPercent: 58, topRecruiters: 'TCS,Wipro,Infosys,HCL,Tech Mahindra' },
    predictorData: [
      { exam: 'JEE_MAIN', category: 'GENERAL', openingRank: 65000, closingRank: 190000 },
      { exam: 'JEE_MAIN', category: 'OBC', openingRank: 88000, closingRank: 240000 },
      { exam: 'JEE_MAIN', category: 'SC', openingRank: 110000, closingRank: 280000 },
    ],
  },
  {
    name: 'Siddaganga Institute of Technology',
    city: 'Tumkur', state: 'Karnataka', type: 'Private',
    nirfRank: 100, nirfScore: 43.95, fees: 75000, rating: 3.7,
    established: 1963,
    description: 'Reputed autonomous engineering college in Karnataka known for affordable quality education.',
    website: 'https://www.sit.ac.in', field: 'Engineering',
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, seats: 180, fees: 75000 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, seats: 150, fees: 75000 },
      { name: 'B.Tech Electronics Engineering', duration: 4, seats: 130, fees: 75000 },
    ],
    placement: { avgPackage: 5, highestPackage: 18, placementPercent: 65, topRecruiters: 'Infosys,Wipro,TCS,Mindtree,Bosch' },
    predictorData: [
      { exam: 'KCET', category: 'GENERAL', openingRank: 5000, closingRank: 25000 },
      { exam: 'KCET', category: 'OBC', openingRank: 10000, closingRank: 40000 },
      { exam: 'KCET', category: 'SC', openingRank: 16000, closingRank: 55000 },
    ],
  },
]

async function main() {
  console.log(`Adding ${newColleges.length} new engineering colleges from NIRF 2024...`)

  const existing = await prisma.college.findMany({ select: { nirfRank: true, name: true } })
  const existingRanks = new Set(existing.map((c) => c.nirfRank))
  const existingNames = new Set(existing.map((c) => c.name.toLowerCase()))

  let added = 0
  let skipped = 0

  for (const data of newColleges) {
    const { courses, placement, predictorData, ...collegeData } = data

    if (existingRanks.has(collegeData.nirfRank) || existingNames.has(collegeData.name.toLowerCase())) {
      console.log(`SKIP (exists): ${collegeData.name} [Rank ${collegeData.nirfRank}]`)
      skipped++
      continue
    }

    const college = await prisma.college.create({
      data: {
        ...collegeData,
        courses: { create: courses },
        placements: { create: { ...placement, year: 2024 } },
        predictorData: { create: predictorData.map((pd) => ({ ...pd, year: 2024 })) },
      },
    })

    console.log(`Added: ${college.name} (Rank ${college.nirfRank})`)
    added++
  }

  console.log(`\nDone! Added: ${added}, Skipped: ${skipped}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect(); await pool.end() })
