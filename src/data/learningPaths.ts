export interface Stage {
  id: string;
  title: string;
  objective: string;
  story: string;
  mission: string;
  topics: string[];
  challenge: {
    prompt: string;
    expectedCommand: string[];
    hint: string;
    successMessage: string;
  };
  reward: {
    badgeId: string;
    badgeName: string;
    badgeIcon: string;
  };
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  stages: Stage[];
}

export const LEARNING_PATHS: Record<string, LearningPath[]> = {
  'pt-BR': [
    {
      id: 'essential',
      title: 'Trilha Essencial',
      description: 'Base fundamental para qualquer profissional de tecnologia. Domine o terminal, permissões, containers e CI/CD.',
      isLocked: false,
      stages: [
        {
          id: 'ess-1',
          title: 'Etapa 1: Fundamentos do Terminal e Sistema',
          objective: 'Dominar navegação e noções básicas do sistema Linux.',
          story: '🏢 Bem-vindo(a) à LinuxCorp! Hoje é seu primeiro dia como estagiário(a) de TI. O gerente de infraestrutura, Carlos, te recebeu com um sorriso e disse: "Antes de tudo, preciso que você se familiarize com o terminal. É a ferramenta mais importante aqui."',
          mission: 'Prove que consegue navegar pelo sistema, criar arquivos e consultar a documentação.',
          topics: ['pwd', 'ls', 'cd', 'man', 'history', 'file', 'tree', 'Estrutura de diretórios', 'sudo'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['pwd', 'mkdir labs', 'cd labs', 'ls', 'touch nota1.txt nota2.txt nota3.txt', 'echo "Primeira aula" > nota1.txt', 'man ls'],
            hint: 'Use pwd, mkdir, cd, touch e echo para completar a missão.',
            successMessage: 'Excelente! Você provou que domina o básico.'
          },
          reward: { badgeId: 'ess-1', badgeName: 'Iniciante do Terminal', badgeIcon: 'Terminal' }
        },
        {
          id: 'ess-2',
          title: 'Etapa 2: Arquivos, Permissões e Propriedades',
          objective: 'Entender permissões, donos e operações essenciais em arquivos.',
          story: '🔐 Carlos ficou impressionado com seu desempenho! Ele te chamou para uma tarefa urgente: "Alguém compartilhou um relatório confidencial com permissões abertas. Precisamos proteger esse arquivo antes que cause problemas."',
          mission: 'Ajuste as permissões dos arquivos para garantir a segurança dos dados da empresa.',
          topics: ['cp', 'mv', 'rm', 'mkdir', 'rmdir', 'chmod', 'chown', 'umask', 'Links simbólicos'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ls -l', 'chmod a-w relatorio.txt', 'chmod u+w relatorio.txt'],
            hint: 'Use chmod para alterar as permissões.',
            successMessage: 'Guardião das Permissões! O arquivo está seguro.'
          },
          reward: { badgeId: 'ess-2', badgeName: 'Guardião das Permissões', badgeIcon: 'Shield' }
        },
        {
          id: 'ess-3',
          title: 'Etapa 3: Processos, Serviços e Logs',
          objective: 'Inspecionar processos e entender serviços do sistema.',
          story: '🔍 ALERTA! O sistema de monitoramento detectou uma anomalia. A CPU do servidor principal está a 98%. Carlos te ligou: "Precisamos identificar o processo suspeito e investigar os logs. Conto com você!"',
          mission: 'Encontre o processo problemático, elimine-o e investigue os logs do sistema.',
          topics: ['ps', 'top', 'kill', 'systemctl', 'journalctl', 'Logs em /var/log'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ps aux', 'kill 5678', 'tail /var/log/syslog'],
            hint: 'Use ps para listar e kill para encerrar.',
            successMessage: 'Detetive do Sistema! Você salvou o servidor.'
          },
          reward: { badgeId: 'ess-3', badgeName: 'Detetive do Sistema', badgeIcon: 'Search' }
        },
        {
          id: 'ess-4',
          title: 'Etapa 4: Rede no Linux (Básico)',
          objective: 'Diagnosticar conectividade e DNS.',
          story: '🌐 A equipe de rede precisa de reforço! Um cliente reportou que não consegue acessar o serviço da LinuxCorp. A líder da equipe, Marina, pediu sua ajuda: "Precisamos diagnosticar a conectividade e encontrar onde o problema está."',
          mission: 'Teste conectividade, rastreie rotas e identifique a configuração de rede.',
          topics: ['ip a', 'ip r', 'ss', 'ping', 'traceroute', 'curl', 'wget', 'dig'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ping google.com', 'traceroute google.com', 'ip a'],
            hint: 'Use ping e traceroute para diagnosticar.',
            successMessage: 'Explorador de Redes! Conectividade validada.'
          },
          reward: { badgeId: 'ess-4', badgeName: 'Explorador de Redes', badgeIcon: 'Globe' }
        },
        {
          id: 'ess-5',
          title: 'Etapa 5: Gerenciamento de Pacotes e Atualizações',
          objective: 'Instalar/remover e manter o sistema atualizado com segurança.',
          story: '📦 O time de desenvolvimento precisa de ferramentas instaladas no servidor de staging. Carlos te delegou a tarefa: "Procure e instale as ferramentas necessárias, e depois limpe o que não for mais usado. Mantenha o servidor enxuto!"',
          mission: 'Gerencie pacotes: busque, instale, remova e atualize o sistema.',
          topics: ['apt', 'repositórios', 'update', 'upgrade', 'snap'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['apt search editor', 'apt install nano-simulado', 'apt remove nano-simulado', 'apt update'],
            hint: 'Use o comando apt.',
            successMessage: 'Mestre dos Pacotes! Sistema atualizado.'
          },
          reward: { badgeId: 'ess-5', badgeName: 'Mestre dos Pacotes', badgeIcon: 'Package' }
        },
        {
          id: 'ess-6',
          title: 'Etapa 6: Shell Scripting (Essencial)',
          objective: 'Automatizar tarefas com scripts simples.',
          story: '⚡ Marina ficou tão impressionada que te convidou para o time de automação! "Temos um processo manual de backup que precisa ser automatizado. Ninguém quer acordar às 3h da manhã pra fazer backup, certo?"',
          mission: 'Crie um script de backup automatizado do zero.',
          topics: ['Bash', 'variáveis', 'if', 'loops', 'Pipes', 'grep'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['touch backup.sh', 'echo "#!/bin/bash" > backup.sh', 'echo "cp -r dados/* backup/" >> backup.sh', 'chmod +x backup.sh', './backup.sh'],
            hint: 'Crie o arquivo, adicione o conteúdo e torne-o executável.',
            successMessage: 'Automatizador! O backup agora é automático.'
          },
          reward: { badgeId: 'ess-6', badgeName: 'Automatizador', badgeIcon: 'Code' }
        },
        {
          id: 'ess-7',
          title: 'Etapa 7: Git e Boas Práticas de Trabalho',
          objective: 'Controlar versão e colaborar.',
          story: '🔀 O time de desenvolvimento está crescendo e precisa organizar o código. O tech lead, Ricardo, disse: "Antes de mais nada, todo mundo precisa dominar Git. Sem controle de versão, é o caos."',
          mission: 'Inicialize um repositório, faça commits e domine o fluxo básico do Git.',
          topics: ['git init', 'git add', 'git commit', 'git branch', 'git status'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['git init', 'echo "Meu Projeto" > README.md', 'git add README.md', 'git commit -m "Commit inicial"', 'git status'],
            hint: 'Use os comandos básicos do git.',
            successMessage: 'Versionador! Código sob controle.'
          },
          reward: { badgeId: 'ess-7', badgeName: 'Versionador', badgeIcon: 'GitBranch' }
        },
        {
          id: 'ess-8',
          title: 'Etapa 8: Containers com Docker (Fundamentos)',
          objective: 'Rodar aplicações isoladas e entender imagens/containers.',
          story: '🐳 A LinuxCorp está migrando para containers! Marina anunciou: "Vamos containerizar nossas aplicações. Quem dominar Docker primeiro vai liderar a migração." É sua chance de brilhar!',
          mission: 'Trabalhe com imagens Docker, baixe e execute containers.',
          topics: ['docker images', 'docker run', 'docker pull', 'Dockerfile'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['docker images', 'docker pull hello-world-simulado', 'docker run hello-world-simulado'],
            hint: 'Use os comandos docker pull e run.',
            successMessage: 'Domador de Containers! Aplicação isolada com sucesso.'
          },
          reward: { badgeId: 'ess-8', badgeName: 'Domador de Containers', badgeIcon: 'Box' }
        },
        {
          id: 'ess-9',
          title: 'Etapa 9: CI/CD e Deploy (Intermediário Inicial)',
          objective: 'Entender pipeline e automatizar testes/deploy.',
          story: '🚀 O CTO da LinuxCorp quer automatizar os deploys. Ricardo te chamou: "Precisamos de um pipeline CI/CD que rode testes automaticamente a cada push. Sem pipeline, não tem deploy!"',
          mission: 'Configure e valide um pipeline CI/CD.',
          topics: ['CI/CD', 'GitHub Actions', 'Build', 'Test', 'Deploy'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['build', 'npm test', 'yamllint .gitlab-ci.yml'],
            hint: 'Valide o arquivo de configuração e rode os testes.',
            successMessage: 'Engenheiro de Pipeline! Deploy automatizado.'
          },
          reward: { badgeId: 'ess-9', badgeName: 'Engenheiro de Pipeline', badgeIcon: 'Zap' }
        },
        {
          id: 'ess-10',
          title: 'Etapa 10: Linux + DevOps na Prática (Projeto Final)',
          objective: 'Consolidar para começar jornada profissional.',
          story: '🏆 É o grande dia! Carlos, Marina e Ricardo estão todos na sala. "Você cresceu muito desde o primeiro dia. Agora queremos ver tudo junto: Git, Docker, logs, backup — o projeto final da LinuxCorp."',
          mission: 'Consolide tudo em um projeto completo com versionamento, logs e organização.',
          topics: ['Observabilidade', 'Troubleshooting', 'Documentação', 'Projeto Final'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['git clone projeto-final', 'cd projeto-final', 'echo "Log criado em $(date)" > log.txt', 'mkdir -p backups', 'mv log.txt backups/', 'ls -la backups/'],
            hint: 'Combine os conhecimentos de Git e terminal.',
            successMessage: 'Pronto para a Jornada! Você é agora um DevOps Engineer.'
          },
          reward: { badgeId: 'ess-10', badgeName: 'Pronto para a Jornada', badgeIcon: 'Award' }
        }
      ]
    },
    {
      id: 'networking',
      title: 'Redes em Linux',
      description: 'Seja o arquiteto e o detetive das conexões. Diagnostique, configure e otimize redes Linux.',
      isLocked: true,
      stages: [
        {
          id: 'net-1',
          title: 'Etapa 1: Fundamentos de Rede no Linux',
          objective: 'Entender a identidade da sua máquina na rede e testar conectividade.',
          story: '🌐 A rede é a espinha dorsal da LinuxCorp. Seu primeiro desafio é entender a identidade da sua máquina na rede. Qual é o seu endereço IP? Como você se conecta ao mundo exterior? Marina, a líder da equipe de rede, te espera.',
          mission: 'Descubra seu IP, teste conectividade e rastreie a rota até o destino.',
          topics: ['ip a', 'ping', 'traceroute'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ip a', 'ping 8.8.8.8', 'traceroute google.com'],
            hint: 'Use ip a, ping e traceroute.',
            successMessage: 'Fundamentos validados!'
          },
          reward: { badgeId: 'net-1', badgeName: 'Fundamentos de Rede', badgeIcon: 'Globe' }
        },
        {
          id: 'net-2',
          title: 'Etapa 2: Configuração de Interfaces de Rede',
          objective: 'Configurar interfaces de rede e garantir conectividade.',
          story: '🔧 Um servidor crítico está offline! Marina te chamou às pressas: "Precisamos configurar a nova interface de rede deste servidor. A conectividade é vital para os nossos serviços!"',
          mission: 'Configure a interface de rede e coloque o servidor online novamente.',
          topics: ['ip link', 'ip addr', 'netplan'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ip link show', 'ip link set eth1 up', 'ip addr add 10.0.0.50/24 dev eth1'],
            hint: 'Ative a interface e adicione o IP.',
            successMessage: 'Interface configurada!'
          },
          reward: { badgeId: 'net-2', badgeName: 'Configurador de Interfaces', badgeIcon: 'Settings' }
        },
        {
          id: 'net-3',
          title: 'Etapa 3: Firewall com Netfilter/iptables',
          objective: 'Configurar regras de firewall para proteger o servidor.',
          story: '🛡️ ALERTA DE SEGURANÇA! O sistema de monitoramento detectou tentativas de acesso não autorizado. Marina precisa que você configure o firewall imediatamente: "Bloqueie tudo, menos o essencial!"',
          mission: 'Configure o firewall para permitir apenas tráfego SSH e bloquear o resto.',
          topics: ['iptables', 'regras', 'segurança'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['iptables -L', 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT', 'iptables -P INPUT DROP'],
            hint: 'Liste as regras e adicione a permissão para a porta 22.',
            successMessage: 'Firewall configurado!'
          },
          reward: { badgeId: 'net-3', badgeName: 'Guardião do Firewall', badgeIcon: 'Shield' }
        },
        {
          id: 'net-4',
          title: 'Etapa 4: DNS e Resolução de Nomes',
          objective: 'Diagnosticar e corrigir problemas de resolução de nomes.',
          story: '📡 Usuários estão reclamando que não conseguem acessar o novo serviço "app.linuxcorp.com". O problema está na resolução de nomes. Você é o único que pode resolver isso antes do prazo.',
          mission: 'Diagnostique o problema de DNS e corrija a configuração de resolução.',
          topics: ['dig', 'nslookup', 'resolv.conf'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['dig app.linuxcorp.com', 'cat /etc/resolv.conf', 'nslookup app.linuxcorp.com 8.8.8.8'],
            hint: 'Use dig e nslookup para testar.',
            successMessage: 'DNS resolvido!'
          },
          reward: { badgeId: 'net-4', badgeName: 'Mestre do DNS', badgeIcon: 'Search' }
        },
        {
          id: 'net-5',
          title: 'Etapa 5: Roteamento e Gateway',
          objective: 'Configurar roteamento para comunicação entre redes.',
          story: '🗺️ A LinuxCorp expandiu e tem uma nova filial. A rede interna precisa se comunicar com a rede da filial. Você é responsável por configurar o roteamento entre as duas redes.',
          mission: 'Configure rotas e gateway para que os pacotes cheguem ao destino correto.',
          topics: ['ip route', 'gateway', 'forwarding'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ip route show', 'ip route add 10.0.0.0/24 via 192.168.1.254', 'echo 1 > /proc/sys/net/ipv4/ip_forward'],
            hint: 'Adicione a rota e habilite o forwarding.',
            successMessage: 'Roteamento configurado!'
          },
          reward: { badgeId: 'net-5', badgeName: 'Arquiteto de Rotas', badgeIcon: 'GitBranch' }
        },
        {
          id: 'net-6',
          title: 'Etapa 6: Monitoramento de Rede',
          objective: 'Monitorar tráfego, latência e utilização de rede em tempo real.',
          story: '📊 O desempenho da rede caiu drasticamente na última hora. Clientes reclamam de lentidão. Marina precisa que você identifique o gargalo usando ferramentas de monitoramento em tempo real.',
          mission: 'Monitore o tráfego, identifique o gargalo e analise as conexões ativas.',
          topics: ['ss', 'tcpdump', 'nmap'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ss -tulnp', 'tcpdump -i eth0', 'nmap localhost'],
            hint: 'Use ss e tcpdump para monitorar.',
            successMessage: 'Monitoramento concluído!'
          },
          reward: { badgeId: 'net-6', badgeName: 'Monitor de Rede', badgeIcon: 'Activity' }
        }
      ]
    },
    {
      id: 'cryptography',
      title: 'Criptografia',
      description: 'Domine a arte de proteger dados. Hash, criptografia simétrica e assimétrica, assinaturas digitais e cofres de segredos.',
      isLocked: true,
      stages: [
        {
          id: 'cry-1',
          title: 'Etapa 1: Fundamentos de Criptografia e Hash',
          objective: 'Verificar integridade de arquivos e criar impressões digitais de dados.',
          story: '🔍 Você recebeu um arquivo importante de um fornecedor externo. Antes de abri-lo, precisa verificar se ele não foi adulterado durante a transferência. Carlos disse: "Nunca confie em um arquivo sem verificar seu hash primeiro."',
          mission: 'Verifique a integridade do arquivo e crie uma impressão digital SHA-256.',
          topics: ['md5sum', 'sha256sum'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['md5sum documento.txt', 'sha256sum documento.txt', 'echo "LinuxCorp2024" | sha256sum'],
            hint: 'Use md5sum e sha256sum.',
            successMessage: 'Integridade verificada!'
          },
          reward: { badgeId: 'cry-1', badgeName: 'Verificador de Integridade', badgeIcon: 'Hash' }
        },
        {
          id: 'cry-2',
          title: 'Etapa 2: Criptografia Simétrica com OpenSSL',
          objective: 'Criptografar e descriptografar arquivos com chave secreta compartilhada.',
          story: '🔐 A LinuxCorp precisa enviar relatórios financeiros para a auditoria externa. Esses dados são altamente confidenciais. Marina pediu: "Criptografe esses arquivos antes de enviar. Use uma chave forte!"',
          mission: 'Criptografe um arquivo confidencial com AES-256 e depois descriptografe-o.',
          topics: ['openssl', 'AES-256', 'simétrica'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['openssl enc -aes-256-cbc -in relatorio.txt -out relatorio.enc', 'openssl enc -aes-256-cbc -d -in relatorio.enc -out relatorio_dec.txt'],
            hint: 'Use openssl enc.',
            successMessage: 'Criptografia simétrica dominada!'
          },
          reward: { badgeId: 'cry-2', badgeName: 'Criptógrafo Simétrico', badgeIcon: 'Lock' }
        },
        {
          id: 'cry-3',
          title: 'Etapa 3: Criptografia Assimétrica e Chaves Públicas/Privadas',
          objective: 'Estabelecer comunicação segura sem compartilhar chave secreta.',
          story: '🔑 O novo servidor da LinuxCorp precisa de acesso SSH seguro. Ricardo disse: "Nada de senhas! Vamos usar par de chaves pública/privada. É mais seguro e mais prático."',
          mission: 'Gere um par de chaves e use criptografia assimétrica para proteger dados.',
          topics: ['ssh-keygen', 'gpg', 'assimétrica'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ssh-keygen', 'gpg --gen-key', 'gpg --encrypt -r admin@linuxcorp.com mensagem.txt'],
            hint: 'Gere as chaves e criptografe.',
            successMessage: 'Mestre das Chaves!'
          },
          reward: { badgeId: 'cry-3', badgeName: 'Mestre das Chaves', badgeIcon: 'Key' }
        },
        {
          id: 'cry-4',
          title: 'Etapa 4: Assinaturas Digitais e Certificados',
          objective: 'Verificar autenticidade e integridade de documentos com assinaturas digitais.',
          story: '📜 Um contrato digital importante foi recebido. O jurídico precisa garantir que o documento é autêntico e não foi alterado. Você precisa criar e verificar assinaturas digitais.',
          mission: 'Crie um certificado, assine um documento digitalmente e verifique a assinatura.',
          topics: ['openssl req', 'assinatura digital'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365', 'openssl dgst -sha256 -sign key.pem -out assinatura.sig contrato.txt'],
            hint: 'Crie o certificado e assine o arquivo.',
            successMessage: 'Autenticador Digital!'
          },
          reward: { badgeId: 'cry-4', badgeName: 'Autenticador Digital', badgeIcon: 'FileCheck' }
        },
        {
          id: 'cry-5',
          title: 'Etapa 5: Gerenciamento de Segredos e Cofres',
          objective: 'Gerenciar credenciais e chaves de API de forma segura e centralizada.',
          story: '🏦 A aplicação principal da LinuxCorp armazena credenciais de banco de dados em texto puro nos arquivos de configuração. Isso é um risco enorme! Sua missão final: implementar um cofre de segredos.',
          mission: 'Armazene e recupere credenciais de forma segura usando um cofre digital.',
          topics: ['Vault', 'segredos'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['vault server -dev', 'vault kv put secret/db password=SuperSecreta123', 'vault kv get secret/db'],
            hint: 'Use o vault para gerenciar os segredos.',
            successMessage: 'Guardião do Cofre!'
          },
          reward: { badgeId: 'cry-5', badgeName: 'Guardião do Cofre', badgeIcon: 'Vault' }
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cibersegurança',
      description: 'Proteja sistemas contra ataques. Varredura de vulnerabilidades, hardening, detecção de intrusões e resposta a incidentes.',
      isLocked: true,
      stages: [
        {
          id: 'cyb-1',
          title: 'Etapa 1: Fundamentos de Segurança e Análise de Vulnerabilidades',
          objective: 'Identificar pontos fracos em servidores com varredura de vulnerabilidades.',
          story: '🎯 Você é o novo responsável pela segurança de um servidor da LinuxCorp. Sua primeira tarefa é identificar os pontos fracos antes que um atacante o faça. Carlos disse: "Pense como um hacker para defender como um profissional."',
          mission: 'Realize uma varredura de portas e identifique serviços vulneráveis.',
          topics: ['nmap', 'vulnerabilidades', 'nikto'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['nmap -sV localhost', 'searchsploit tomcat 8.5', 'nikto -h localhost'],
            hint: 'Use nmap e nikto para varredura.',
            successMessage: 'Vulnerabilidades identificadas!'
          },
          reward: { badgeId: 'cyb-1', badgeName: 'Caçador de Vulnerabilidades', badgeIcon: 'Bug' }
        },
        {
          id: 'cyb-2',
          title: 'Etapa 2: Hardening de Sistemas Linux',
          objective: 'Fortalecer as defesas do sistema seguindo melhores práticas de segurança.',
          story: '🛡️ Após identificar as vulnerabilidades, é hora de fortalecer as defesas. Marina disse: "Este servidor precisa virar uma fortaleza. Desabilite tudo que não for essencial e configure proteções."',
          mission: 'Aplique técnicas de hardening para tornar o sistema mais resistente.',
          topics: ['hardening', 'fail2ban'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['systemctl disable tomcat', 'systemctl stop tomcat', 'systemctl start fail2ban'],
            hint: 'Pare o serviço vulnerável e inicie o fail2ban.',
            successMessage: 'Hardening aplicado!'
          },
          reward: { badgeId: 'cyb-2', badgeName: 'Endurecedor de Sistemas', badgeIcon: 'ShieldCheck' }
        },
        {
          id: 'cyb-3',
          title: 'Etapa 3: Detecção de Intrusões e Monitoramento de Logs',
          objective: 'Monitorar logs em tempo real para detectar atividade maliciosa.',
          story: '👁️ O sistema de alertas disparou! Há atividade suspeita nos logs de autenticação. Múltiplas tentativas de login falhadas foram detectadas. Você precisa investigar imediatamente.',
          mission: 'Monitore logs em tempo real e identifique tentativas de intrusão.',
          topics: ['logs', 'intrusão', 'tail'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['tail -f /var/log/auth.log', 'grep "Failed password" /var/log/auth.log', 'journalctl -f'],
            hint: 'Use tail e grep para investigar os logs.',
            successMessage: 'Intrusão detectada!'
          },
          reward: { badgeId: 'cyb-3', badgeName: 'Detetive de Intrusões', badgeIcon: 'Eye' }
        },
        {
          id: 'cyb-4',
          title: 'Etapa 4: Segurança de Aplicações Web (Básico)',
          objective: 'Configurar um servidor web para ser mais seguro.',
          story: '🌐 A aplicação web da LinuxCorp será lançada publicamente. Antes disso, precisamos garantir que o servidor web está configurado de forma segura. Sem SSL e sem headers de segurança, é um alvo fácil.',
          mission: 'Configure SSL/TLS e cabeçalhos de segurança no servidor web.',
          topics: ['SSL', 'TLS', 'Nginx'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt', 'curl -k https://localhost'],
            hint: 'Gere o certificado e teste com curl.',
            successMessage: 'Servidor web seguro!'
          },
          reward: { badgeId: 'cyb-4', badgeName: 'Protetor Web', badgeIcon: 'Globe' }
        },
        {
          id: 'cyb-5',
          title: 'Etapa 5: Resposta a Incidentes (Básico)',
          objective: 'Conter ataques, preservar evidências e restaurar a normalidade.',
          story: '🚨 INCIDENTE CONFIRMADO! Um servidor foi comprometido. O atacante conseguiu acesso root. Você precisa conter o ataque, preservar evidências para análise forense e restaurar a normalidade.',
          mission: 'Contenha o ataque, preserve evidências e identifique o vetor de entrada.',
          topics: ['incidente', 'forense'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ip link set eth0 down', 'dd if=/dev/sda of=/mnt/backup/image.dd bs=4M status=progress', 'grep "Accepted" /var/log/auth.log'],
            hint: 'Derrube a rede e faça a imagem do disco.',
            successMessage: 'Incidente contido!'
          },
          reward: { badgeId: 'cyb-5', badgeName: 'Respondedor de Incidentes', badgeIcon: 'AlertTriangle' }
        },
        {
          id: 'cyb-6',
          title: 'Etapa 6: Autenticação e Autorização Seguras',
          objective: 'Implementar mecanismos robustos de autenticação e autorização.',
          story: '🏆 Missão final! Após todos os incidentes, a LinuxCorp decidiu implementar autenticação robusta em todos os servidores. Ricardo disse: "Chaves SSH, 2FA, permissões mínimas — a tríade da segurança de acesso."',
          mission: 'Configure autenticação segura com chaves SSH e permissões restritas.',
          topics: ['SSH', '2FA', 'autenticação'],
          challenge: {
            prompt: 'user@linuxcorp:~$',
            expectedCommand: ['ssh-keygen -t rsa -b 4096', 'ssh-copy-id admin@servidor', "sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config"],
            hint: 'Gere a chave e desabilite a autenticação por senha.',
            successMessage: 'Mestre da Autenticação!'
          },
          reward: { badgeId: 'cyb-6', badgeName: 'Mestre da Autenticação', badgeIcon: 'UserCheck' }
        }
      ]
    }
  ]
};
