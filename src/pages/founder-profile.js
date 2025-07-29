import React from "react";

export default function FounderProfile() {
  return (
    <main className="py-16 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="flex items-center justify-between bg-gray-300 border border-gray-400 p-4 rounded-md">
  <h1 className="text-2xl md:text-6xl font-bold text-gray-800">
    MUHAMMAD SURAZ HARFANSYAH
  </h1>
  <img
    src="/suraz.png" // ganti dengan path gambarmu
    alt="Muhammad Suraz Harfansyah"
    className="w-20 h-20 object-cover rounded border"
  />
</section>

<section className="text-sm text-gray-800 leading-relaxed space-y-2">
  <p>
    <strong>Address:</strong> Kebembem Raya Street No. 99 Abadijaya Subdistrict, Sukmajaya District, Depok City, West Java, Indonesia (16417)
  </p>
  <p>
    <strong>Phone Number:</strong>{' '}
    <a href="tel:+6285220239100" className="text-blue-600 underline">+62 852 2023 9100</a>{' '}
    – <strong>LINE ID:</strong>{' '}
    <a href="https://line.me/ti/p/~6285220239100id" target="_blank" rel="noreferrer" className="text-blue-600 underline">6285220239100id</a>{' '}
    – <strong>Email:</strong>{' '}
    <a href="mailto:muhammadsurazharfansyah@gmail.com" className="text-blue-600 underline">muhammadsurazharfansyah@gmail.com</a>
  </p>
  <p>
    <strong>LinkedIn:</strong>{' '}
    <a href="https://www.linkedin.com/in/Muhammad-Suraz" target="_blank" rel="noreferrer" className="text-blue-600 underline">https://www.linkedin.com/in/Muhammad-Suraz</a>{' '}
    – <strong>Instagram:</strong>{' '}
    <a href="https://instagram.com/muhammadsuraz_official" target="_blank" rel="noreferrer" className="text-blue-600 underline">instagram.com/muhammadsuraz_official</a>
  </p>
  <p>
    <strong>Date of Birth:</strong> 21<sup>st</sup> Mar 2006{' '}
    – <strong>Nationality:</strong> Indonesian{' '}
    – <strong>Ethnicity:</strong> Acehnese mix Sundanese
  </p>
</section>

<section>
  <h2 className="text-2xl font-semibold mb-2 border-b pb-1">Professional Summary</h2>
  <p className="text-gray-800 leading-relaxed">
    An ambitious person with strong leadership, visionary thinking, and multidisciplinary skills.
    Proven ability to manage businesses, lead organizations, and drive innovative projects.
    Passionate about creating positive impact through education, entrepreneurship, and global collaborations.
    All in all, I’m someone who has hopes of making the world a better place.
  </p>
</section>

<section>
  <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Education</h2>

  {/* SMA */}
  <div className="mb-6">
    <div className="flex flex-col md:flex-row md:justify-between">
      <div>
        <p className="font-semibold">Public Senior High School 2 Depok</p>
        <p>Depok, West Java</p>
        <p>
          <span className="font-medium">Math and Natural Sciences Major Program (3 Years)</span>:{' '}
          12<sup>th</sup> Jul 2021 – 6<sup>th</sup> May 2024
        </p>
      </div>
      <p className="font-semibold mt-2 md:mt-0">GPA: <span className="font-normal">95 out of 100</span></p>
    </div>

    <p className="mt-2 font-semibold">Honors:</p>
    <ul className="list-disc ml-6 grid grid-cols-1 md:grid-cols-2 gap-1">
      <li>Valedictorian (1st rank out of 600 students)</li>
      <li>Founder of Calisthenics Extracurricular</li>
      <li>Awardee of School’s Prestigious Merit Scholarship</li>
      <li>President of Muslim Association</li>
      <li>Class Representative for three consecutive years</li>
      <li>School’s Karate Club Representative</li>
    </ul>
  </div>

  {/* SMP */}
  <div>
    <div className="flex flex-col md:flex-row md:justify-between">
      <div>
        <p className="font-semibold">Public Middle School 3 Depok</p>
        <p>Depok, West Java</p>
        <p>
          <span className="font-medium">Middle School Program (3 Years)</span>:{' '}
          17<sup>th</sup> Jul 2018 – 25<sup>th</sup> Jun 2021
        </p>
      </div>
      <p className="font-semibold mt-2 md:mt-0">GPA: <span className="font-normal">91 out of 100</span></p>
    </div>

    <p className="mt-2 font-semibold">Honors:</p>
    <ul className="list-disc ml-6 grid grid-cols-1 md:grid-cols-2 gap-1">
      <li>Valedictorian (1st rank out of 360 students)</li>
      <li>President of School’s Karate Club</li>
      <li>Awardee of School’s Merit-Based Scholarship</li>
      <li>Vice President of Muslim Association</li>
    </ul>
  </div>
</section>

<section className="mt-8">
  <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Work and Internship Experience</h2>

  {/* Liiystore */}
  <div className="mb-6">
    <p className="font-bold">Founder and CEO of Liiystore <span className="font-normal">– West Java, Indonesia</span></p>
    <p className="text-sm text-gray-600 mb-2">16<sup>th</sup> May 2019 to Present &nbsp;
      <a href="http://liiystore.id/companyprofile" target="_blank" rel="noreferrer" className="text-blue-600 underline">[ Tap to view Company Profile ]</a>
    </p>
    <ul className="list-disc ml-6 space-y-1 text-sm">
      <li>Founded this <span className="underline">exporter company</span> in mid 2019 that <span className="underline">engaged in the distribution and export</span> of Muslim fashion designs for the Southeast Asia region with a total of <span className="underline">57 employees</span> at present.</li>
      <li>Managed to <span className="underline">increase the company's sales</span> to become the <span className="underline">1st rank best-selling product</span> in e-commerce such as Shopee, Lazada, TikTok Shop, Tokopedia, and Blibli.</li>
      <li>Managed to <span className="underline">attract tens of thousands of buyers/month</span> and managed to bring in <span className="underline">revenue of 100,000$/month</span>.</li>
      <li>Successfully <span className="underline">exported thousands of products</span> to other countries such as <span className="underline">Malaysia, Singapore, Brunei, etc.</span></li>
      <li>Successfully <span className="underline">gained tens of thousands of loyal repeat customers</span> every year who <span className="underline">become members of our store</span>.</li>
      <li>Successfully <span className="underline">launched each product and represent it very well</span> in front of <span className="underline">investors</span> and <span className="underline">potential buyers</span>.</li>
      <li>Successfully <span className="underline">led the company</span> to the point our company was <span className="underline">covered frequently by local & national newspapers</span>.</li>
    </ul>
  </div>

  {/* Fanboy Printing */}
  <div>
    <p className="font-bold">Co-Founder and CEO of Fanboy Printing <span className="font-normal">– West Java, Indonesia</span></p>
    <p className="text-sm text-gray-600 mb-2">12<sup>th</sup> Apr 2025 to Present &nbsp;
      <a href="http://fanboyprinting.id/company-profile/" target="_blank" rel="noreferrer" className="text-blue-600 underline">[ Tap to view Company Profile ]</a>
    </p>
    <ul className="list-disc ml-6 space-y-1 text-sm">
      <li>Co-founded Fanboy Printing, <span className="underline">a fashion and merchandise printing company</span> specializing in <span className="underline">sublimation, DTF, and UV DTF printing</span> for apparel, accessories, and promotional items.</li>
      <li>Serving as <span className="underline">Chief Executive Officer</span> and holding the largest <span className="underline">ownership stake</span> in the company (same as <span className="underline">Liiystore</span>).</li>
      <li><span className="underline">Leading overall business strategy and operations</span> with a <span className="underline">focus on local and national markets</span>.</li>
      <li>Committed to <span className="underline">establishing Fanboy Printing as a trusted brand</span> for customizable fashion and merchandise.</li>
    </ul>
  </div>
  <div className="mt-6">
  <p className="font-bold">
    Official School Ambassador of International MUN <span className="font-normal">– Uttar Pradesh, India</span>
  </p>
  <p className="text-sm text-gray-600 mb-2">
    20<sup>th</sup> Oct 2023 to 14<sup>th</sup> Nov 2023
  </p>
  <ul className="list-disc ml-6 space-y-1 text-sm">
    <li>
      Promoted <span className="underline">Model United Nations (MUN) activities</span> as an <span className="underline">Official School Ambassador</span> and provided tips about public speaking to my audience on my <span className="underline">Instagram page with 144,000 followers</span>.
    </li>
    <li>
      Successfully <span className="underline">demonstrated strong leadership abilities</span> by <span className="underline">recruiting student volunteers</span> for various programs.
    </li>
    <li>
      Able to <span className="underline">attract thousands of people to join and participate</span> in Model United Nations (MUN) events.
    </li>
    <li>
      Managed to <span className="underline">write a comprehensive and accurate report</span>, and completed the internship with <span className="underline">excellence</span>.
    </li>
    <li>
      Successfully <span className="underline">promoted Climate Action</span>, which is one of the <span className="underline">Sustainable Development Goals (SDGs)</span>.
    </li>
  </ul>
</div>

</section>

<section className="mt-10">
  <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Academic Awards and Certificates</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border text-sm text-left text-gray-800">
      <thead className="bg-gray-100 border">
        <tr>
          <th className="border px-4 py-2 font-semibold">Name</th>
          <th className="border px-4 py-2 font-semibold">Field</th>
          <th className="border px-4 py-2 font-semibold">Acquired on</th>
          <th className="border px-4 py-2 font-semibold">Institution</th>
          <th className="border px-4 py-2 font-semibold">Detailed Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Silver Medallist in National Islamic Olympiad</td>
          <td className="border px-4 py-2">National Islamic Olympiad</td>
          <td className="border px-4 py-2">
            16/12/2023<br />
            <a href="https://drive.google.com/file/d/1QqYXDNKx7p2NjDXDJJBl-hnnSaAKAUaM/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
          </td>
          <td className="border px-4 py-2">
            Indonesian Ministry of Religious Affairs and Ministry of Education, Culture, Research, and Technology
          </td>
          <td className="border px-4 py-2">
            I won a silver medal at the national level in the Islamic Olympiad held in Malang on 16 December 2023 after winning a gold medal at the provincial level. The Olympiad was curated by Puspresnas RI (National Achievement Centre of the Republic of Indonesia), the Ministry of Education and Culture, and the Ministry of Religious Affairs.
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Gold Medallist in the province of West Java in the Islamic Olympiad</td>
          <td className="border px-4 py-2">Provincial level Islamic Olympiad</td>
          <td className="border px-4 py-2">
            24/11/2023<br />
            <a href="https://drive.google.com/file/d/1Qqd_hLMNrHUDDV5hiekZX__bUwyKIFWQ/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
          </td>
          <td className="border px-4 py-2">
            Indonesian Ministry of Religious Affairs and Ministry of Education, Culture, Research, and Technology
          </td>
          <td className="border px-4 py-2">
            I won the provincial Islamic Olympiad as the gold medallist of West Java province held at the West Java Governor's Office on 24 November 2023. The Olympiad was curated by Puspresnas RI (National Achievement Centre of the Republic of Indonesia), the Ministry of Education and Culture, and the Ministry of Religious Affairs.
          </td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Certificate of Appreciation for Securing 2nd Position in Poster Category at LTK SDGs Summit 2023</td>
          <td className="border px-4 py-2">International creative poster making competition themed on one of the SDGs in the United Nation (UN)</td>
          <td className="border px-4 py-2">
            3/12/2023<br />
            <a href="https://drive.google.com/file/d/1QqiiGOgRD8sCgtJcVEuX4VQGsca4Np-f/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
          </td>
          <td className="border px-4 py-2">
            Langkah Teman Kamu (A popular NGO that working on Sustainable Development Goals (SDGs))
          </td>
          <td className="border px-4 py-2">
            I acquired this certificate after getting 2nd place in an international creative poster making competition with a poster theme that chose one of the Sustainable Development Goals of the United Nations. I chose to make a poster based on the 14th Theme of SDGs with the theme of Climate Action.
          </td>
        </tr>
        <tr>
  <td className="border px-4 py-2">Certificate of Internship at International MUN</td>
  <td className="border px-4 py-2">One and a half month of internship program as a school ambassador</td>
  <td className="border px-4 py-2">
    27/11/2023<br />
    <a href="https://drive.google.com/file/d/1QyctuyavXKBAyAOumW-00-QJPTaIoIrR/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">International Model United Nations (IMUN) and UNHCR</td>
  <td className="border px-4 py-2">
    I acquired this certificate of internship after completing my duty as school ambassador intern for one and a half months at International MUN in Uttar Pradesh, India.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">Top 100 in Biology on the International Science Olympiad (ISO)</td>
  <td className="border px-4 py-2">International Science Olympiad with the subject of Biology</td>
  <td className="border px-4 py-2">
    19/11/2023<br />
    <a href="https://drive.google.com/file/d/1Qz4qH3zArjMKwkfdes0FUPDjcZ5BDpql/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">
    International Test Level Institution (ILTI), International Science Olympiad Institution (ISO), and Edu Expo Indonesia
  </td>
  <td className="border px-4 py-2">
    I acquired the top 100 in Biology in the international science olympiad held at the North Sumatra governor's office on 19 November. This competition was organized by the International Test Level Institution (ILTI), the International Science Olympiad Institution (ISO), also the Edu Expo Indonesia institution which is part of the University of North Sumatra.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">Top 100 in English at the International Science Olympiad (ISO)</td>
  <td className="border px-4 py-2">International Science Olympiad with the subject of English</td>
  <td className="border px-4 py-2">
    19/11/2023<br />
    <a href="https://drive.google.com/file/d/1QyhvG-u7uIEJgYuSJsdRn-6M-0vd2YIW/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">ILTI, ISO, and Edu Expo Indonesia</td>
  <td className="border px-4 py-2">
    I won the top 100 in English Language along with top 100 in Biology in the International Science Olympiad (ISO) held at the North Sumatra governor's office on 19 November.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">Certificate of Appreciation from Ministry of Tourism and Creative Economy</td>
  <td className="border px-4 py-2">Volunteer program in the field of tourism and local culture education</td>
  <td className="border px-4 py-2">
    18/11/2023<br />
    <a href="https://drive.google.com/file/d/1R-x04A_yGLH6QNekL2GroI1rt04Uvtpl/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">Indonesian Ministry of Tourism and Creative Economy and Dealls</td>
  <td className="border px-4 py-2">
    A tourism and cultural education program for local communities using fun and engaging game methods to foster awareness of tourism and local culture.
    This voluntary event runs from 1<sup>st</sup> November – 3<sup>rd</sup> November 2023.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">Certificate of Appreciation for joining the 2<sup>nd</sup> International Conference of Biology for Student x Open Bioproject Competition</td>
  <td className="border px-4 py-2">2<sup>nd</sup> International Conference of Biology for Student x Open Bioproject Competition 2023 held under Bioinformatics Research Center (BRC) INBIO Indonesia</td>
  <td className="border px-4 py-2">
    12/11/2023<br />
    <a href="https://drive.google.com/file/d/1R8b9ei4MAwbhnSq60h7aRMo1dah4HOW7/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">
    Organized by Indonesia Bioinformatics and Biomolecular, BRC, CAPA, Chain Lab, and Biosystem of Brawijaya University
  </td>
  <td className="border px-4 py-2">
    The 2nd International Biology Conference of Biology is an event held under BRC INBIO Indonesia.
    It’s an integration of conference and project made for high school students studying biological sciences.
    This project is essential for youth biologists to collaborate, expand networks, and understand biology deeper.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">Certificate of Intelligent Quality (IQ) for receiving the category of <em>“Very Superior”</em></td>
  <td className="border px-4 py-2">IQ certificate and psychological test results</td>
  <td className="border px-4 py-2">
    4/10/2023<br />
    <a href="https://drive.google.com/file/d/1R-DFtISGeRkM_0Ao4ShS14plH7dvbxxy/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">Rajawali Counselling Indonesia</td>
  <td className="border px-4 py-2">
    The result of my IQ test indicates that the student received an IQ score of 130 (Very Superior),
    with results showing talent in scientific, mechanical, and computational reasoning.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">Bronze Medalist at Indonesian Independence Olympiad</td>
  <td className="border px-4 py-2">National Mathematics Olympiad</td>
  <td className="border px-4 py-2">
    29/08/2023<br />
    <a href="https://drive.google.com/file/d/1R7Atd80RY3BiMyF9edmoxHZwEf8iw2Q7/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">Youth Empower New Scientist</td>
  <td className="border px-4 py-2">
    I won the Bronze Medal in Mathematics at the Indonesian Independence Olympics held in Medan and acquired the certificate on 29<sup>th</sup> August 2023.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">Gold Medallist at Indonesian National Science Competition</td>
  <td className="border px-4 py-2">National Chemistry Olympiad</td>
  <td className="border px-4 py-2">
    27/08/2023<br />
    <a href="https://drive.google.com/file/d/1R8DxWCFBDtyTWu-08f654lknbWw2JSvQ/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">Puskanas (National Science Championship Centre)</td>
  <td className="border px-4 py-2">
    I won a Gold Medal in Chemistry at the Indonesian National Science Competition (AKSI) in Yogyakarta on 27<sup>th</sup> August 2023 held by Puskanas National Science Championship Centre.
  </td>
</tr>
<tr>
  <td className="border px-4 py-2">1st Place Winner in Virtual Mathematics Competition</td>
  <td className="border px-4 py-2">National level Virtual Mathematics Competition</td>
  <td className="border px-4 py-2">
    16/04/2023<br />
    <a href="https://drive.google.com/file/d/1RBDmSepWSxIVnt0CSJnUH48ypHUUFzzM/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
  </td>
  <td className="border px-4 py-2">Kromnas Indonesia</td>
  <td className="border px-4 py-2">
    I won first place in the 2023 National Virtual Mathematics Competition with a perfect score of 175/175 organized by Kromnas Indonesia on 16 April 2023 virtually at each school in Indonesia.
  </td>
</tr>

      </tbody>
    </table>
  </div>
</section>

<section className="mt-10">
  <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Academic Awards and Certificates</h2>

  <div className="overflow-x-auto rounded-lg border shadow-sm">
    <table className="w-full text-sm md:text-base text-left text-gray-800 border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-3 py-2 md:px-4 md:py-3 font-semibold">Name</th>
          <th className="border px-3 py-2 md:px-4 md:py-3 font-semibold">Field</th>
          <th className="border px-3 py-2 md:px-4 md:py-3 font-semibold">Acquired on</th>
          <th className="border px-3 py-2 md:px-4 md:py-3 font-semibold">Institution</th>
          <th className="border px-3 py-2 md:px-4 md:py-3 font-semibold">Detailed Description</th>
        </tr>
      </thead>
      <tbody>
        {/* Seluruh isi tabel kamu tetap di sini (tidak diubah) */}
        {/* ... */}
      </tbody>
    </table>
  </div>
</section>



<section className="mt-8">
  <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Voluntary Activities</h2>

  <div>
    <p className="font-bold">
      Volunteer Program Organized by KEMENPAREKRAF RI (Ministry of Tourism and Creative Economy of The Republic of Indonesia) and Dealls
      <span className="font-normal"> – Leo Hall, Jakarta</span>
    </p>
    <p className="text-sm font-semibold mt-1">Date: <span className="font-normal">Nov 2023</span></p>
    <p className="mt-2 text-sm leading-relaxed text-gray-800">
      Participated in a national volunteer program organized by the Indonesian Ministry of Tourism and Creative Economy, promoting cultural education to local communities through interactive activities. This program aims to improve the social spirit of the local communities and raise awareness of the importance of tourism and local culture and their role in it. The method used in this program is using group games that are educational and interesting, thus can increase our solidarity with others.
    </p>
  </div>
</section>

<section className="mt-8">
  <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Special Talents</h2>
  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 list-disc ml-6 text-sm text-gray-800">
    <li>Manual Art Painting</li>
    <li>Videography</li>
    <li>Play Guitar & Piano</li>
    <li>Fashion Design</li>
    <li>Digital Art Painting</li>
    <li>Shotokan Karate</li>
    <li>Artistic Doodling</li>
    <li>Leadership & Management</li>
    <li>Photography & Editing</li>
    <li>Calisthenics & Parkour</li>
    <li>Storytelling & Poetry</li>
    <li>Acting and Public Speaking</li>
  </ul>

  <h2 className="text-2xl font-semibold border-b pb-1 mt-8 mb-4">Technical Skills</h2>
  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 list-disc ml-6 text-sm text-gray-800">
    <li>Web Design</li>
    <li>UX/UI Design</li>
    <li>Web Services</li>
    <li>Canva Design</li>
    <li>Data Analysis</li>
    <li>Copy Writing</li>
    <li>Java & HTML</li>
    <li>Python</li>
    <li>Digital Marketing</li>
    <li>Project Management</li>
    <li>Comprehensive Writing</li>
    <li>Java Script</li>
    <li>Content Creation</li>
    <li>SEO</li>
    <li>Social Media Operating</li>
  </ul>
</section>

<section className="mt-10">
  {/* Languages Proficiency */}
  <h2 className="text-2xl font-semibold border-b pb-1 mb-4">Languages Proficiency</h2>
  <ul className="list-disc ml-6 space-y-1 text-sm text-gray-800">
    <li>
      <strong>Native:</strong> Bahasa Indonesia and Bahasa Melayu
    </li>
    <li>
      <strong>Proficient:</strong> English, Overall score on TOEFL iBT 101/120 (Equivalent to CEFR C2){' '}
      <a href="https://drive.google.com/file/d/14sqFKv1WCKKYKLOh3ojLPOUmX0oLXs9s/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view Certificate ]</a>
    </li>
    <li>
      <strong>Conversational:</strong> Japanese, Chinese, French
    </li>
  </ul>

  {/* References Information */}
  <h2 className="text-2xl font-semibold border-b pb-1 mt-8 mb-4">References Information</h2>
  <div className="space-y-6 text-sm text-gray-800">
    <div>
      <p><strong>Dr. Wawan Ridwan S.Pd., M.H., M.Si.</strong> – Public Senior High School 2 Depok</p>
      <p>Principal of Public Senior High School 2 Depok</p>
      <p><strong>Fax Number:</strong> +62-021-77832057</p>
      <p><strong>Work Email:</strong> <a href="mailto:sman2.depok@yahoo.com" className="text-blue-600 underline">sman2.depok@yahoo.com</a></p>
      <p><a href="https://drive.google.com/file/d/1RSVlZgGdLLzEXr0K3KMlheJ_vFWDbg0R/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view the Letter of Recommendation ]</a></p>
    </div>

    <div>
      <p><strong>Nurul Fazrin S.Pd.</strong> – Public Senior High School 2 Depok</p>
      <p>English Teacher and Classroom Teacher</p>
      <p><strong>Phone Number:</strong> +62 878 0813 5340</p>
      <p><strong>Personal Email:</strong> <a href="mailto:n.fazrin06@gmail.com" className="text-blue-600 underline">n.fazrin06@gmail.com</a></p>
      <p><a href="https://drive.google.com/file/d/1RNXM2xFJSIQpq624qvvPUGV09LwUNgF_/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view the Letter of Recommendation ]</a></p>
    </div>

    <div>
      <p><strong>Mohneesh Bhardwaj</strong> – International Model United Nations (IMUN)</p>
      <p>Executive Chairman of IMUN</p>
      <p><strong>Phone Number:</strong> +91 999 741 5973</p>
      <p><strong>Personal Email:</strong> <a href="mailto:mohneesh123@gmail.com" className="text-blue-600 underline">mohneesh123@gmail.com</a></p>
      <p><strong>Work Email:</strong> <a href="mailto:mohneesh.bhardwaj@internationalmun.org" className="text-blue-600 underline">mohneesh.bhardwaj@internationalmun.org</a></p>
      <p><a href="https://drive.google.com/file/d/1RVhQHvUH_pu9FfqEwT-GjPNFUpVAQ6yV/view?usp=drivesdk" className="text-blue-600 underline">[ Tap to view the Letter of Recommendation ]</a></p>
    </div>
  </div>
</section>



      </div>
    </main>
  );
}
