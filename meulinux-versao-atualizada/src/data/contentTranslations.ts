import { ContentSection } from '../pages/Content';

export interface ContentData {
  title: string;
  subtitle: string;
  image: string;
  concept: string;
  sections: {
    heading: string;
    image?: string;
    paragraphs: string[];
  }[];
  softwares?: {
    [category: string]: {
      name: string;
      url: string;
      icon: string;
    }[];
  };
}

export const contentTranslations: Record<string, Record<ContentSection, ContentData>> = {
  en: {
    'gnu-linux': {
      title: 'GNU / Linux',
      subtitle: 'From the beginning to distros, some changes.',
      image: '/assets/pinguim-linux-tux-2-871x1024-1.png',
      concept: 'There is an old controversy whether we should refer to it as "GNU/Linux" or just "Linux", which revolves around the proper recognition of the GNU Project\'s contribution to the operating system. While the system core is provided by Linux (Created by Linus Torvalds), a significant part of the essential tools comes from the GNU Project (Created by Richard Stallman). The founder of the GNU Project argues that the term "GNU/Linux" should be used to highlight the importance of free software and the GNU philosophy in the creation of the system.',
      sections: [
        {
          heading: 'Learn more about the GNU project',
          image: '/assets/rms.jpg',
          paragraphs: [
            'The GNU Project is a fundamental part of Linux, together forming the system known as GNU/Linux. GNU, started by Richard Stallman in 1983, provides the essential tools that, when combined with the Linux kernel, create a complete operating system. While the Linux kernel manages hardware resources, the GNU Project contributes a variety of software components, including the GCC compiler (GNU Compiler Collection), Bash (Bourne Again SHell, a command interpreter), among others.',
            'The collaboration between GNU and Linux was crucial for the creation of an open-source, robust, and highly functional operating system. GNU provided the key pieces for a Unix-like environment, while Linux offered an efficient and powerful kernel. The synergy between these two projects resulted in an operating system that is highly customizable, stable, and suitable for a wide range of applications, from high-performance servers to embedded devices and personal computers.',
            'The GNU Project\'s emphasis on the philosophy of free software, with its four fundamental "freedoms", resonates in GNU/Linux as a whole. This means that users have the freedom to use, study, modify, and redistribute the software, promoting transparency, collaboration, and freedom of choice.'
          ]
        },
        {
          heading: 'Learn more about the Linux project',
          image: '/assets/LinuxCon-Europe-Linus-Torvalds-qf9b04w8senwdima3y24esdr86zttrny8rfmttn4es.jpg',
          paragraphs: [
            'Linux is an operating system kernel, developed by Linus Torvalds in 1991. It plays a central role in the GNU/Linux operating system, which is a combination of the Linux kernel and the tools of the GNU Project. Linux is a monolithic kernel, which means it directly manages hardware resources and provides an interface between hardware and user-level software.',
            'The success of Linux can be attributed to its open-source nature and collaborative development model. The Linux source code is available to the public, allowing developers worldwide to contribute to its improvement. This collaborative approach resulted in a robust, secure, and reliable operating system.',
            'The combination of the Linux kernel with the GNU Project tools created a powerful synergy that defines GNU/Linux as a powerful and open-source alternative to proprietary operating systems. It represents not only advanced technology but also fundamental values of freedom, collaboration, and transparency.'
          ]
        },
        {
          heading: 'Where is Linux? Leader in servers, security, and development',
          paragraphs: [
            'Contrary to the common perception of a direct rivalry with "Windows" or "macOS", Linux stands out in specific areas that go far beyond simple desktop competition. Its true domain lies behind the scenes, where Linux emerges as the operating system of choice in servers, security systems, and development environments.',
            '1. Servers: The Unquestionable Choice. Linux has consolidated its position as the leading operating system for servers worldwide. From large data centers to cloud hosting, Linux distributions like Ubuntu Server, CentOS, and Red Hat are preferred for their stability, efficiency, and scalability.',
            '2. Security Systems: The Unshakable Foundation. In an increasingly digital world, information security is paramount. Linux is recognized for its intrinsic security and the active community that quickly addresses vulnerabilities.',
            '3. Development: Innovation Environment. Software developers and programmers find in Linux an environment conducive to innovation and collaboration. The wide range of development tools, libraries, and compilers available allows for significant customization.'
          ]
        }
      ]
    },
    'software-livre': {
      title: 'Free Software',
      subtitle: 'Freedom, distribution, security, and innovation.',
      image: '/assets/The_GNU_logo.png',
      concept: 'Free software is a political and philosophical movement that values freedom of access to the source code of any software by the user community. It is developed through open collaboration and is available to everyone who wants to use, investigate, change, and redistribute. It is considered more secure than proprietary software because the source code is available for public review.',
      sections: [
        {
          heading: 'What is free software?',
          paragraphs: [
            'Free software is software developed and maintained through an open collaboration and available, usually at no cost, for anyone to use, investigate, change, and redistribute as they wish. This contrasts with proprietary applications or proprietary software, for example, Microsoft Word and Adobe Photoshop, which are sold to end users by the creator or copyright holder and cannot be edited, improved, or redistributed except when specified by the owner.',
            'It is important to remember that the word "free" does not mean the same thing as "gratis". When we think of free software, we should think of freedom of use, distribution, and modification of the source code. A project developed based on free software can be monetized or free.',
            'The Free Software Foundation (FSF) defines free software as software that meets four fundamental freedoms:',
            '• Freedom 0: The freedom to run the program for any purpose.',
            '• Freedom 1: The freedom to study how the program works and adapt it to your needs.',
            '• Freedom 2: The freedom to distribute copies of the program to others.',
            '• Freedom 3: The freedom to improve the program and share your improvements with others.'
          ]
        },
        {
          heading: 'Why do users and companies prefer free software?',
          paragraphs: [
            'Reasons for choosing free software can vary. In many cases, end users are unaware of the free software programs on their computers or mobile devices. A company, on the other hand, may choose free software over a proprietary alternative for its low (or no) cost, the flexibility to customize the source code, or the existence of a large support community for the application.',
            'While free software products can save companies licensing costs, they may incur some costs, usually for network integration, end-user, and IT support. Still, many companies consider enterprise free software at least as reliable and secure as proprietary software.'
          ]
        },
        {
          heading: 'Why should you use free software?',
          image: '/assets/sl.png',
          paragraphs: [
            'There are many reasons why you should use free software. Here are some of them:',
            '• Freedom: Free software offers more freedom to users than proprietary software.',
            '• Versatility: Free software is available for a wide variety of devices and platforms.',
            '• Security: Free software is often more secure than proprietary software.',
            '• Economy: Free software is generally free or much more affordable than proprietary software.'
          ]
        }
      ],
      softwares: {
        'Browsers': [
          { name: 'Firefox', url: 'https://www.mozilla.org/firefox/', icon: '/assets/Firefox_logo,_2019.svg' },
          { name: 'Chromium', url: 'https://www.chromium.org/getting-involved/download-chromium/', icon: '/assets/Chromium_11_Logo.svg' },
          { name: 'Falkon', url: 'https://www.falkon.org/download/', icon: '/assets/falkon_browser_logo_icon_152993.png' }
        ],
        'Office Suites': [
          { name: 'LibreOffice', url: 'https://www.libreoffice.org/download/download-libreoffice/', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMu5k78s6kMZWUEvHN9E9FY6i0tLfzoTO8fQ&s' },
          { name: 'OnlyOffice', url: 'https://www.onlyoffice.com/download.aspx', icon: '/assets/fb_icon_325x325.jpg' }
        ],
        'Graphic Design': [
          { name: 'GIMP', url: 'https://www.gimp.org/downloads/', icon: '/assets/The_GIMP_icon_-_gnome.svg' },
          { name: 'Inkscape', url: 'https://inkscape.org/release/', icon: '/assets/inkscape.png' },
          { name: 'Krita', url: 'https://krita.org/en/download/krita-desktop/', icon: '/assets/Calligrakrita-base.svg' },
          { name: 'Mosca Tee', url: 'https://moscatee.com/', icon: '/assets/icon-mosca-512.png' }
        ],
        'Video Editors': [
          { name: 'Kdenlive', url: 'https://kdenlive.org/en/download/', icon: '/assets/Kdenlive.png' },
          { name: 'Shotcut', url: 'https://shotcut.org/download/', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeML_vtXykiGV6o66OwcqRrtzbpcKkd2wJFw&s' }
        ],
        'Text Editors': [
          { name: 'Vim', url: 'https://www.vim.org/download.php', icon: '/assets/Vimlogo.svg' },
          { name: 'Emacs', url: 'https://www.gnu.org/software/emacs/download.html', icon: '/assets/EmacsIcon.svg' }
        ]
      }
    },
    'open-source': {
      title: 'Open Source',
      subtitle: 'Unveiling the World of Open Source',
      image: '/assets/4201992logoopenopensourcesocialsocialmediasource-115717_115584.png',
      concept: 'Open source or Open-source software is any program where the developer releases the source code for free. Whenever software has an open-source license, it means that anyone in the world can download, modify, and distribute it without paying fees to its original creator.',
      sections: [
        {
          heading: 'What is Open Source?',
          paragraphs: [
            'The term "open source" refers to a type of software whose source code is made available to the general public. This means that anyone can view, modify, and distribute that code. In contrast to proprietary software, in which the code is kept secret, open source promotes transparency and collaboration.'
          ]
        },
        {
          heading: 'Key differences between Open Source and proprietary software',
          paragraphs: [
            '1. Accessible Source Code: In open source, the software source code is available for anyone to examine. This allows for greater transparency and trust in the user community.',
            '2. Freedom to Modify: With open source, users have the freedom to modify the software according to their needs. This leads to a high level of customization and continuous innovation.',
            '3. Free Licenses: Open source is generally distributed with licenses that allow redistribution and modification, as long as the same freedoms are granted to others.'
          ]
        },
        {
          heading: 'How can Open Source be useful in daily life?',
          paragraphs: [
            '1. Cost Savings: Many open-source softwares are free, eliminating the need to pay for licenses.',
            '2. Unlimited Customization: With access to the source code, users can adapt the software to meet their specific needs.',
            '3. Enhanced Security: The transparent nature of open source means that many eyes are constantly examining the code for vulnerabilities.',
            '4. Active Community: Open source is driven by communities of passionate developers.'
          ]
        }
      ]
    }
  },
  pt: {
    'gnu-linux': {
      title: 'GNU / Linux',
      subtitle: 'Do início às distros, algumas mudanças.',
      image: '/assets/pinguim-linux-tux-2-871x1024-1.png',
      concept: 'Existe uma antiga controvérsia sobre se devemos nos referir a ele como "GNU/Linux" ou apenas "Linux", que gira em torno do reconhecimento adequado da contribuição do Projeto GNU para o sistema operacional. Enquanto o núcleo do sistema é fornecido pelo Linux (Criado por Linus Torvalds), uma parte significativa das ferramentas essenciais vem do Projeto GNU (Criado por Richard Stallman). O fundador do Projeto GNU argumenta que o termo "GNU/Linux" deve ser usado para destacar a importância do software livre e da filosofia GNU na criação do sistema.',
      sections: [
        {
          heading: 'Saiba mais sobre o projeto GNU',
          image: '/assets/rms.jpg',
          paragraphs: [
            'O Projeto GNU é uma parte fundamental do Linux, formando juntos o sistema conhecido como GNU/Linux. O GNU, iniciado por Richard Stallman em 1983, fornece as ferramentas essenciais que, quando combinadas com o kernel Linux, criam um sistema operacional completo. Enquanto o kernel Linux gerencia os recursos de hardware, o Projeto GNU contribui com uma variedade de componentes de software, incluindo o compilador GCC (GNU Compiler Collection), Bash (Bourne Again SHell, um intérprete de comandos), entre outros.',
            'A colaboração entre GNU e Linux foi crucial para a criação de um sistema operacional de código aberto, robusto e altamente funcional. O GNU forneceu as peças-chave para um ambiente semelhante ao Unix, enquanto o Linux ofereceu um kernel eficiente e poderoso. A sinergia entre esses dois projetos resultou em um sistema operacional altamente personalizável, estável e adequado para uma ampla gama de aplicações, desde servidores de alto desempenho até dispositivos embarcados e computadores pessoais.',
            'A ênfase do Projeto GNU na filosofia do software livre, com suas quatro "liberdades" fundamentais, ressoa no GNU/Linux como um todo. Isso significa que os usuários têm a liberdade de usar, estudar, modificar e redistribuir o software, promovendo transparência, colaboração e liberdade de escolha.'
          ]
        },
        {
          heading: 'Saiba mais sobre o projeto Linux',
          image: '/assets/LinuxCon-Europe-Linus-Torvalds-qf9b04w8senwdima3y24esdr86zttrny8rfmttn4es.jpg',
          paragraphs: [
            'O Linux é um kernel de sistema operacional, desenvolvido por Linus Torvalds em 1991. Ele desempenha um papel central no sistema operacional GNU/Linux, que é uma combinação do kernel Linux e das ferramentas do Projeto GNU. O Linux é um kernel monolítico, o que significa que ele gerencia diretamente os recursos de hardware e fornece uma interface entre o hardware e o software de nível de usuário.',
            'O sucesso do Linux pode ser atribuído à sua natureza de código aberto e ao seu modelo de desenvolvimento colaborativo. O código-fonte do Linux está disponível ao público, permitindo que desenvolvedores de todo o mundo contribuam para sua melhoria. Essa abordagem colaborativa resultou em um sistema operacional robusto, seguro e confiável.',
            'A combinação do kernel Linux com as ferramentas do Projeto GNU criou uma poderosa sinergia que define o GNU/Linux como uma alternativa poderosa e de código aberto aos sistemas operacionais proprietários. Ele representa não apenas tecnologia avançada, mas também valores fundamentais de liberdade, colaboração e transparência.'
          ]
        },
        {
          heading: 'Onde está o Linux? Líder em servidores, segurança e desenvolvimento',
          paragraphs: [
            'Ao contrário da percepção comum de uma rivalidade direta com "Windows" ou "macOS", o Linux se destaca em áreas específicas que vão muito além da simples competição de desktop. Seu verdadeiro domínio reside nos bastidores, onde o Linux emerge como o sistema operacional de escolha em servidores, sistemas de segurança e ambientes de desenvolvimento.',
            '1. Servidores: A Escolha Inquestionável. O Linux consolidou sua posição como o principal sistema operacional para servidores em todo o mundo. De grandes data centers a hospedagem em nuvem, distribuições Linux como Ubuntu Server, CentOS e Red Hat são preferidas por sua estabilidade, eficiência e escalabilidade.',
            '2. Sistemas de Segurança: A Fundação Inabalável. Em um mundo cada vez mais digital, a segurança da informação é primordial. O Linux é reconhecido por sua segurança intrínseca e pela comunidade ativa que aborda rapidamente as vulnerabilidades.',
            '3. Desenvolvimento: Ambiente de Inovação. Desenvolvedores de software e programadores encontram no Linux um ambiente propício à inovação e colaboração. A ampla gama de ferramentas de desenvolvimento, bibliotecas e compiladores disponíveis permite uma personalização significativa.'
          ]
        }
      ]
    },
    'software-livre': {
      title: 'Software Livre',
      subtitle: 'Liberdade, distribuição, segurança e inovação.',
      image: '/assets/The_GNU_logo.png',
      concept: 'Software livre é um movimento político e filosófico que valoriza a liberdade de acesso ao código-fonte de qualquer software pela comunidade de usuários. Ele é desenvolvido através de colaboração aberta e está disponível para todos que queiram usar, investigar, alterar e redistribuir. É considerado mais seguro que o software proprietário porque o código-fonte está disponível para revisão pública.',
      sections: [
        {
          heading: 'O que é software livre?',
          paragraphs: [
            'Software livre é o software desenvolvido e mantido através de uma colaboração aberta e disponível, geralmente sem custo, para qualquer pessoa usar, investigar, alterar e redistribuir como desejar. Isso contrasta com aplicativos proprietários ou software proprietário, por exemplo, Microsoft Word e Adobe Photoshop, que são vendidos aos usuários finais pelo criador ou detentor dos direitos autorais e não podem ser editados, melhorados ou redistribuídos, exceto quando especificado pelo proprietário.',
            'É importante lembrar que a palavra "livre" não significa o mesmo que "grátis". Quando pensamos em software livre, devemos pensar em liberdade de uso, distribuição e modificação do código-fonte. Um projeto desenvolvido com base em software livre pode ser monetizado ou gratuito.',
            'A Free Software Foundation (FSF) define software livre como o software que atende a quatro liberdades fundamentais:',
            '• Liberdade 0: A liberdade de executar o programa para qualquer propósito.',
            '• Liberdade 1: A liberdade de estudar como o programa funciona e adaptá-lo às suas necessidades.',
            '• Liberdade 2: A liberdade de distribuir cópias do programa para outras pessoas.',
            '• Liberdade 3: A liberdade de melhorar o programa e compartilhar suas melhorias com o público.'
          ]
        },
        {
          heading: 'Por que usuários e empresas preferem software livre?',
          paragraphs: [
            'As razões para escolher software livre podem variar. Em muitos casos, os usuários finais não têm conhecimento dos programas de software livre em seus computadores ou dispositivos móveis. Uma empresa, por outro lado, pode escolher o software livre em vez de uma alternativa proprietária por seu baixo (ou nenhum) custo, a flexibilidade para personalizar o código-fonte ou a existência de uma grande comunidade de suporte para o aplicativo.',
            'Embora os produtos de software livre possam economizar custos de licenciamento para as empresas, eles podem incorrer em alguns custos, geralmente para integração de rede, suporte ao usuário final e TI. Ainda assim, muitas empresas consideram o software livre empresarial pelo menos tão confiável e seguro quanto o software proprietário.'
          ]
        },
        {
          heading: 'Por que você deve usar software livre?',
          image: '/assets/sl.png',
          paragraphs: [
            'Existem muitas razões pelas quais você deve usar software livre. Aqui estão algumas delas:',
            '• Liberdade: O software livre oferece mais liberdade aos usuários do que o software proprietário.',
            '• Versatilidade: O software livre está disponível para uma ampla variedade de dispositivos e plataformas.',
            '• Segurança: O software livre é frequentemente mais seguro que o software proprietário.',
            '• Economia: O software livre é geralmente gratuito ou muito mais acessível do que o software proprietário.'
          ]
        }
      ],
      softwares: {
        'Navegadores': [
          { name: 'Firefox', url: 'https://www.mozilla.org/firefox/', icon: '/assets/Firefox_logo,_2019.svg' },
          { name: 'Chromium', url: 'https://www.chromium.org/getting-involved/download-chromium/', icon: '/assets/Chromium_11_Logo.svg' },
          { name: 'Falkon', url: 'https://www.falkon.org/download/', icon: '/assets/falkon_browser_logo_icon_152993.png' }
        ],
        'Suítes de Escritório': [
          { name: 'LibreOffice', url: 'https://www.libreoffice.org/download/download-libreoffice/', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMu5k78s6kMZWUEvHN9E9FY6i0tLfzoTO8fQ&s' },
          { name: 'OnlyOffice', url: 'https://www.onlyoffice.com/download.aspx', icon: '/assets/fb_icon_325x325.jpg' }
        ],
        'Design Gráfico': [
          { name: 'GIMP', url: 'https://www.gimp.org/downloads/', icon: '/assets/The_GIMP_icon_-_gnome.svg' },
          { name: 'Inkscape', url: 'https://inkscape.org/release/', icon: '/assets/inkscape.png' },
          { name: 'Krita', url: 'https://krita.org/en/download/krita-desktop/', icon: '/assets/Calligrakrita-base.svg' },
          { name: 'Mosca Tee', url: 'https://moscatee.com/', icon: '/assets/icon-mosca-512.png' }
        ],
        'Editores de Vídeo': [
          { name: 'Kdenlive', url: 'https://kdenlive.org/en/download/', icon: '/assets/Kdenlive.png' },
          { name: 'Shotcut', url: 'https://shotcut.org/download/', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeML_vtXykiGV6o66OwcqRrtzbpcKkd2wJFw&s' }
        ],
        'Editores de Texto': [
          { name: 'Vim', url: 'https://www.vim.org/download.php', icon: '/assets/Vimlogo.svg' },
          { name: 'Emacs', url: 'https://www.gnu.org/software/emacs/download.html', icon: '/assets/EmacsIcon.svg' }
        ]
      }
    },
    'open-source': {
      title: 'Open Source',
      subtitle: 'Desvendando o Mundo do Código Aberto',
      image: '/assets/4201992logoopenopensourcesocialsocialmediasource-115717_115584.png',
      concept: 'Open source ou software de código aberto é qualquer programa onde o desenvolvedor libera o código-fonte gratuitamente. Sempre que um software tem uma licença de código aberto, significa que qualquer pessoa no mundo pode baixar, modificar e distribuir sem pagar taxas ao seu criador original.',
      sections: [
        {
          heading: 'O que é Open Source?',
          paragraphs: [
            'O termo "open source" refere-se a um tipo de software cujo código-fonte é disponibilizado ao público em geral. Isso significa que qualquer pessoa pode visualizar, modificar e distribuir esse código. Em contraste com o software proprietário, no qual o código é mantido em segredo, o código aberto promove transparência e colaboração.'
          ]
        },
        {
          heading: 'Principais diferenças entre Open Source e software proprietário',
          paragraphs: [
            '1. Código-Fonte Acessível: No código aberto, o código-fonte do software está disponível para qualquer pessoa examinar. Isso permite maior transparência e confiança na comunidade de usuários.',
            '2. Liberdade para Modificar: Com o código aberto, os usuários têm a liberdade de modificar o software de acordo com suas necessidades. Isso leva a um alto nível de personalização e inovação contínua.',
            '3. Licenças Gratuitas: O código aberto é geralmente distribuído com licenças que permitem a redistribuição e modificação, desde que as mesmas liberdades sejam concedidas a outros.'
          ]
        },
        {
          heading: 'Como o Open Source pode ser útil no dia a dia?',
          paragraphs: [
            '1. Economia de Custos: Muitos softwares de código aberto são gratuitos, eliminando a necessidade de pagar por licenças.',
            '2. Personalização Ilimitada: Com acesso ao código-fonte, os usuários podem adaptar o software para atender às suas necessidades específicas.',
            '3. Segurança Aprimorada: A natureza transparente do código aberto significa que muitos olhos estão constantemente examinando o código em busca de vulnerabilidades.',
            '4. Comunidade Ativa: O código aberto é impulsionado por comunidades de desenvolvedores apaixonados.'
          ]
        }
      ]
    }
  },
  es: {
    'gnu-linux': {
      title: 'GNU / Linux',
      subtitle: 'Desde el principio hasta las distros, algunos cambios.',
      image: '/assets/pinguim-linux-tux-2-871x1024-1.png',
      concept: 'Existe una antigua controversia sobre si deberíamos referirnos a él como "GNU/Linux" o simplemente "Linux", que gira en torno al reconocimiento adecuado de la contribución del Proyecto GNU al sistema operativo. Mientras que el núcleo del sistema es proporcionado por Linux (Creado por Linus Torvalds), una parte significativa de las herramientas esenciales proviene del Proyecto GNU (Creado por Richard Stallman). El fundador del Proyecto GNU argumenta que el término "GNU/Linux" debe usarse para resaltar la importancia del software libre y la filosofía GNU en la creación del sistema.',
      sections: [
        {
          heading: 'Más información sobre el proyecto GNU',
          image: '/assets/rms.jpg',
          paragraphs: [
            'El Proyecto GNU es una parte fundamental de Linux, formando juntos el sistema conocido como GNU/Linux. GNU, iniciado por Richard Stallman en 1983, proporciona las herramientas esenciales que, cuando se combinan con el kernel de Linux, crean un sistema operativo completo. Mientras que el kernel de Linux gestiona los recursos de hardware, el Proyecto GNU contribuye con una variedad de componentes de software, incluido el compilador GCC (GNU Compiler Collection), Bash (Bourne Again SHell, un intérprete de comandos), entre otros.',
            'La colaboración entre GNU y Linux fue crucial para la creación de un sistema operativo de código abierto, robusto y altamente funcional. GNU proporcionó las piezas clave para un entorno similar a Unix, mientras que Linux ofreció un kernel eficiente y potente. La sinergia entre estos dos proyectos dio como resultado un sistema operativo altamente personalizable, estable y adecuado para una amplia gama de aplicaciones, desde servidores de alto rendimiento hasta dispositivos integrados y computadores personales.',
            'El énfasis del Proyecto GNU en la filosofía del software libre, con sus cuatro "libertades" fundamentales, resuena en GNU/Linux en su conjunto. Esto significa que los usuarios tienen la libertad de usar, estudiar, modificar y redistribuir el software, promoviendo la transparencia, la colaboración y la libertad de elección.'
          ]
        },
        {
          heading: 'Más información sobre el proyecto Linux',
          image: '/assets/LinuxCon-Europe-Linus-Torvalds-qf9b04w8senwdima3y24esdr86zttrny8rfmttn4es.jpg',
          paragraphs: [
            'Linux es un núcleo de sistema operativo, desarrollado por Linus Torvalds en 1991. Juega un papel central en el sistema operativo GNU/Linux, que es una combinación del núcleo de Linux y las herramientas del Proyecto GNU. Linux es un núcleo monolítico, lo que significa que gestiona directamente los recursos de hardware y proporciona una interfaz entre el hardware y el software de nivel de usuario.',
            'El éxito de Linux puede atribuirse a su naturaleza de código abierto y a su modelo de desarrollo colaborativo. El código fuente de Linux está disponible al público, lo que permite a desarrolladores de todo el mundo contribuir a su mejora. Este enfoque colaborativo dio como resultado un sistema operativo robusto, seguro y confiable.',
            'La combinación del núcleo de Linux con las herramientas del Proyecto GNU creó una poderosa sinergia que define a GNU/Linux como una alternativa poderosa y de código abierto a los sistemas operativos propietarios. Representa no solo tecnología avanzada, sino también valores fundamentales de libertad, colaboración y transparencia.'
          ]
        },
        {
          heading: '¿Dónde está Linux? Líder em servidores, seguridad y desarrollo',
          paragraphs: [
            'Contrariamente a la percepción común de una rivalidad directa con "Windows" o "macOS", Linux destaca en áreas específicas que van mucho más allá de la simple competencia de escritorio. Su verdadero dominio reside entre bastidores, donde Linux emerge como el sistema operativo de elección en servidores, sistemas de seguridad y entornos de desarrollo.',
            '1. Servidores: La Elección Incuestionable. Linux ha consolidado su posición como el sistema operativo líder para servidores en todo el mundo. Desde grandes centros de datos hasta alojamiento en la nube, las distribuciones de Linux como Ubuntu Server, CentOS y Red Hat son preferidas por su estabilidad, eficiencia y escalabilidad.',
            '2. Sistemas de Seguridad: La Base Inquebrantable. En un mundo cada vez más digital, la seguridad de la información es primordial. Linux es reconocido por su seguridad intrínseca y por la comunidad activa que aborda rápidamente las vulnerabilidades.',
            '3. Desarrollo: Entorno de Innovación. Los desarrolladores de software y programadores encuentran en Linux un entorno propicio para la innovación y la colaboración. La amplia gama de herramientas de desarrollo, bibliotecas y compiladores disponibles permite una personalización significativa.'
          ]
        }
      ]
    },
    'software-livre': {
      title: 'Software Libre',
      subtitle: 'Libertad, distribución, seguridad e innovación.',
      image: '/assets/The_GNU_logo.png',
      concept: 'El software libre es un movimiento político y filosófico que valora la libertad de acceso al código fuente de cualquier software por parte de la comunidad de usuarios. Se desarrolla a través de la colaboración abierta y está disponible para todos los que quieran usarlo, investigarlo, cambiarlo y redistribuirlo. Se considera más seguro que el software propietario porque el código fuente está disponible para revisión pública.',
      sections: [
        {
          heading: '¿Qué es el software libre?',
          paragraphs: [
            'El software libre es software desarrollado y mantenido a través de una colaboración abierta y disponible, generalmente sin costo, para que cualquier persona lo use, investigue, cambie y redistribuya como desee. Esto contrasta con las aplicaciones propietarias o el software propietario, por ejemplo, Microsoft Word y Adobe Photoshop, que son vendidos a los usuarios finales por el creador o el titular de los derechos de autor y no pueden ser editados, mejorados o redistribuidos, excepto cuando lo especifique el propietario.',
            'Es importante recordar que la palabra "libre" no significa lo mismo que "gratis". Quando pensamos en software libre, debemos pensar en libertad de uso, distribución y modificación del código fuente. Un proyecto desarrollado basándose en software libre puede ser monetizado o gratuito.',
            'La Free Software Foundation (FSF) define el software libre como el software que cumple con cuatro libertades fundamentales:',
            '• Libertad 0: La libertad de ejecutar el programa para cualquier propósito.',
            '• Libertad 1: La libertad de estudiar cómo funciona el programa y adaptarlo a tus necesidades.',
            '• Libertad 2: La libertad de distribuir copias del programa a otros.',
            '• Libertad 3: La libertad de mejorar el programa y compartir tus mejoras con los demás.'
          ]
        },
        {
          heading: '¿Por qué los usuarios y las empresas prefieren el software libre?',
          paragraphs: [
            'Las razones para elegir software libre pueden variar. En muchos casos, los usuarios finales no conocen los programas de software libre en sus computadoras o dispositivos móviles. Una empresa, por otro lado, puede elegir software libre en lugar de una alternativa propietaria por su bajo (o nulo) costo, la flexibilidad para personalizar el código fuente o la existencia de una gran comunidad de soporte para la aplicación.',
            'Si bien los productos de software libre podem ahorrar a las empresas costos de licencia, pueden incurrir en algunos costos, generalmente por integración de red, soporte al usuario final y TI. Aun así, muchas empresas consideran que el software libre empresarial es al menos tan confiable y seguro como el software propietario.'
          ]
        },
        {
          heading: '¿Por qué deberías usar software libre?',
          image: '/assets/sl.png',
          paragraphs: [
            'Hay muchas razones por las que deberías usar software libre. Aquí hay algunas de ellas:',
            '• Libertad: El software libre ofrece más libertad a los usuarios que el software propietario.',
            '• Versatilidad: El software libre está disponible para una amplia variedad de dispositivos y plataformas.',
            '• Seguridad: El software libre suele ser más seguro que el software propietario.',
            '• Economía: El software libre suele ser gratuito o mucho más asequible que el software propietario.'
          ]
        }
      ],
      softwares: {
        'Navegadores': [
          { name: 'Firefox', url: 'https://www.mozilla.org/firefox/', icon: '/assets/Firefox_logo,_2019.svg' },
          { name: 'Chromium', url: 'https://www.chromium.org/getting-involved/download-chromium/', icon: '/assets/Chromium_11_Logo.svg' },
          { name: 'Falkon', url: 'https://www.falkon.org/download/', icon: '/assets/falkon_browser_logo_icon_152993.png' }
        ],
        'Suites de Oficina': [
          { name: 'LibreOffice', url: 'https://www.libreoffice.org/download/download-libreoffice/', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMu5k78s6kMZWUEvHN9E9FY6i0tLfzoTO8fQ&s' },
          { name: 'OnlyOffice', url: 'https://www.onlyoffice.com/download.aspx', icon: '/assets/fb_icon_325x325.jpg' }
        ],
        'Diseño Gráfico': [
          { name: 'GIMP', url: 'https://www.gimp.org/downloads/', icon: '/assets/The_GIMP_icon_-_gnome.svg' },
          { name: 'Inkscape', url: 'https://inkscape.org/release/', icon: '/assets/inkscape.png' },
          { name: 'Krita', url: 'https://krita.org/en/download/krita-desktop/', icon: '/assets/Calligrakrita-base.svg' },
          { name: 'Mosca Tee', url: 'https://moscatee.com/', icon: '/assets/icon-mosca-512.png' }
        ],
        'Editores de Vídeo': [
          { name: 'Kdenlive', url: 'https://kdenlive.org/en/download/', icon: '/assets/Kdenlive.png' },
          { name: 'Shotcut', url: 'https://shotcut.org/download/', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeML_vtXykiGV6o66OwcqRrtzbpcKkd2wJFw&s' }
        ],
        'Editores de Texto': [
          { name: 'Vim', url: 'https://www.vim.org/download.php', icon: '/assets/Vimlogo.svg' },
          { name: 'Emacs', url: 'https://www.gnu.org/software/emacs/download.html', icon: '/assets/EmacsIcon.svg' }
        ]
      }
    },
    'open-source': {
      title: 'Open Source',
      subtitle: 'Descubriendo el Mundo del Código Abierto',
      image: '/assets/4201992logoopenopensourcesocialsocialmediasource-115717_115584.png',
      concept: 'Open source o software de código abierto es cualquier programa en el que el desarrollador libera el código fuente de forma gratuita. Siempre que un software tenga una licencia de código abierto, significa que cualquier persona en el mundo puede descargarlo, modificarlo y distribuirlo sin pagar tarifas a su creador original.',
      sections: [
        {
          heading: '¿Qué es el Open Source?',
          paragraphs: [
            'El término "open source" se refiere a un tipo de software cuyo código fuente se pone a disposición del público en general. Esto significa que cualquier persona puede ver, modificar y distribuir ese código. A diferencia del software propietario, en el que el código se mantiene en secreto, el código abierto promueve la transparencia y la colaboración.'
          ]
        },
        {
          heading: 'Diferencias clave entre el Open Source y el software propietario',
          paragraphs: [
            '1. Código fuente accesible: En el código abierto, el código fuente del software está disponible para que cualquiera lo examine. Esto permite una mayor transparencia y confianza en la comunidad de usuarios.',
            '2. Libertad para modificar: Con el código abierto, los usuarios tienen la libertad de modificar el software según sus necesidades. Esto conduce a un alto nivel de personalización e innovación continua.',
            '3. Licencias gratuitas: El código abierto generalmente se distribuye con licencias que permiten la redistribución y modificación, siempre que se otorguen las mismas libertades a los demás.'
          ]
        },
        {
          heading: '¿Cómo puede ser útil el Open Source en la vida diaria?',
          paragraphs: [
            '1. Ahorro de costos: Muchos softwares de código abierto son gratuitos, lo que elimina la necesidad de pagar licencias.',
            '2. Personalización ilimitada: Con acceso al código fuente, los usuarios pueden adaptar el software para satisfacer sus necesidades específicas.',
            '3. Seguridad mejorada: La naturaleza transparente del código abierto significa que muchos ojos examinan constantemente el código en busca de vulnerabilidades.',
            '4. Comunidad activa: El código abierto está impulsado por comunidades de desarrolladores apasionados.'
          ]
        }
      ]
    }
  }
};
