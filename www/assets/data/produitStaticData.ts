export const listProduits = {
  filiales: [
    {
      familleProduits: [
        {
          type: 'EpargneIndividuelle',
          libelle: 'Epargne et Retraite'
        },
        {
          type: 'Mixte',
          libelle: 'Rente Education'
        },
        {
          type: 'EpargnePrevoyanceIndividuelle',
          libelle: 'Pension'
        },
      ],
      codeFiliale: 'TG_VIE',
      produits: [
        {
          id: 1014,
          ligne: 0,
          code: '2180',
          imageUrl: 'ixperta_retraite.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA RETRAITE',
          famille: 'vie',
          nature: 'EpargneIndividuelle',
          capitalMinimum: 5000,
          capitalMax: 50000,
          step: 5000,
          charge: {
            coutPiece: 0,
            droitEntree: 0,
          },
          beneficiaresType: [
            {
              id: 'ConjointDefautEnfant',
              libelle: 'Conjoint a defaut les enfants',
              occurances: 1
            },
            {
              id: 'ConJoint_Conjointe',
              libelle: 'Le conjoint',
              occurances: 1
            },
            {
              id: 'Autre',
              libelle: 'Autres',
              occurances: 6
            },
            {
              id: 'EnfantsNesOuANaitre',
              libelle: 'Enfants nées ou à naitre',
              occurances: 6
            }
          ],
          modeReglements: [
            {
              ligne: 0,
              code: 'M',
              libelle: 'Mobile Money'
            },
            {
              ligne: 1,
              code: 'E',
              libelle: 'Espèce'
            },
            {
              ligne: 2,
              code: 'B',
              libelle: 'Bancaire',
              field: {
                id: 'txtNumeroCompte',
                required: true
              }
            },
            {
              ligne: 3,
              code: 'Visa',
              libelle: 'Visa',
              field: {
                id: 'txtCompteVisa',
                required: true
              }
            }
          ],
          fractionnements: [
            {
              id: 'Mensuelle',
              ligne: 0,
              code: 'Mensuelle',
              libelle: 'Mensuelle'
            },
            {
              id: 'Trimestrielle',
              ligne: 1,
              code: 'Trimestrielle',
              libelle: 'Trimestrielle'
            },
            {
              id: 'Semestrielle',
              ligne: 2,
              code: 'Semestrielle',
              libelle: 'Semestrielle'
            },
            {
              id: 'Annuelle',
              ligne: 3,
              code: 'Annuelle',
              libelle: 'Annuelle'
            }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'GEP1',
              libelle: 'Epargne',
              required: true,
              ageMinimum: '18',
              ageMax: '',
              risques: [
                {
                  ligne: 0,
                  code: 'RPAR',
                  designation: 'Rachat Partiel',
                  libelle: 'Rachat Partiel'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            },
            {
              ligne: 1,
              type: 'TIRA',
              code: 'GETS',
              libelle: 'Tirage Epargne Plus',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'TIRA',
                  designation: 'Tirage au sort',
                  libelle: 'Tirage au sort'
                }
              ]
            }
          ]
        },
        {
          id: 1017,
          ligne: 1,
          code: '3100',
          imageUrl: 'ixperta_etude.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA ETUDES',
          famille: 'vie',
          nature: 'Mixte',
          capitalMinimum: 100000,
          capitalMax: 1000000,
          step: 100000,
          charge: {
            coutPiece: 0,
            droitEntree: 0,
          },
          rente: {
            unite: 'A',
            libelle: 'Ans',
            duree: [
              {
                ligne: 0,
                value: 3
              },
              {
                ligne: 1,
                value: 4
              },
              {
                ligne: 2,
                value: 5
              }
            ]
          },
          beneficiaresType: [
              {
                id: 'ConjointDefautEnfant',
                libelle: 'Conjoint a defaut les enfants',
                occurances: 1
              },
              {
                id: 'ConJoint_Conjointe',
                libelle: 'Le conjoint',
                occurances: 1
              },
              {
                id: 'Autre',
                libelle: 'Autres',
                occurances: 6
              },
              {
                id: 'EnfantsNesOuANaitre',
                libelle: 'Enfants nées ou à naitre',
                occurances: 6
              }
          ],
          fractionnements: [
            {
              id: 'Mensuelle',
              ligne: 0,
              code: 'Mensuelle',
              libelle: 'Mensuelle'
            },
            {
              id: 'Trimestrielle',
              ligne: 1,
              code: 'Trimestrielle',
              libelle: 'Trimestrielle'
            },
            {
              id: 'Semestrielle',
              ligne: 2,
              code: 'Semestrielle',
              libelle: 'Semestrielle'
            },
            {
              id: 'Annuelle',
              ligne: 3,
              code: 'Annuelle',
              libelle: 'Annuelle'
            }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'IRED',
              libelle: 'Rente Education',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      familleProduits: [
        {
          type: 'EpargneIndividuelle',
          libelle: 'Epargne et Retraite'
        },
        {
          type: 'Mixte',
          libelle: 'Rente Education'
        },
        {
          type: 'EpargnePrevoyanceIndividuelle',
          libelle: 'Pension'
        }
      ],
      codeFiliale: 'CI_VIE',
      produits: [
        {
          id: 12071,
          ligne: 0,
          code: '2160',
          imageUrl: 'ixperta_retraite.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA RETRAITE',
          famille: 'vie',
          nature: 'EpargneIndividuelle',
          capitalMinimum: 5000,
          capitalMax: 100000,
          step: 5000,
          charge: {
            coutPiece: 0,
            droitEntree: 0,
          },
          beneficiaresType: [
            {
              id: 'ConjointDefautEnfant',
              libelle: 'Conjoint a defaut les enfants',
              occurances: 1
            },
            {
              id: 'ConJoint_Conjointe',
              libelle: 'Le conjoint',
              occurances: 1
            },
            {
              id: 'Autre',
              libelle: 'Autres',
              occurances: 6
            },
            {
              id: 'EnfantsNesOuANaitre',
              libelle: 'Enfants nées ou à naitre',
              occurances: 6
            }
          ],
          modeReglements: [
            {
              ligne: 0,
              code: 'M',
              libelle: 'Mobile Money'
            },
            {
              ligne: 1,
              code: 'E',
              libelle: 'Espèce'
            },
            {
              ligne: 2,
              code: 'B',
              libelle: 'Bancaire',
              field: {
                id: 'txtNumeroCompte',
                required: true
              }
            },
            {
              ligne: 3,
              code: 'Visa',
              libelle: 'Visa',
              field: {
                id: 'txtCompteVisa',
                required: true
              }
            }
          ],
          fractionnements: [
            {
              id: 'Mensuelle',
              ligne: 0,
              code: 'Mensuelle',
              libelle: 'Mensuelle'
            },
            {
              id: 'Trimestrielle',
              ligne: 1,
              code: 'Trimestrielle',
              libelle: 'Trimestrielle'
            },
            {
              id: 'Semestrielle',
              ligne: 2,
              code: 'Semestrielle',
              libelle: 'Semestrielle'
            },
            {
              id: 'Annuelle',
              ligne: 3,
              code: 'Annuelle',
              libelle: 'Annuelle'
            }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'IES2',
              libelle: 'Epargne Retraite',
              required: true,
              ageMinimum: '18',
              ageMax: '60',
              risques: [
                {
                  ligne: 0,
                  code: 'RPAR',
                  designation: 'Rachat Partiel',
                  libelle: 'Rachat Partiel'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            },
            {
              ligne: 1,
              type: 'DCS',
              code: 'IDS2',
              libelle: 'Décès Toutes Causes',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'TIRA',
                  designation: 'Tirage au sort',
                  libelle: 'Tirage au sort'
                }
              ]
            }
          ]
        },
        {
          id: 12085,
          ligne: 0,
          code: '2600',
          imageUrl: 'ixperta_epargne_projet.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA EPARGNE PROJET',
          famille: 'vie',
          nature: 'EpargneIndividuelle',
          capitalMinimum: 5000,
          capitalMax: 100000,
          step: 5000,
          charge: {
            coutPiece: 1000,
            droitEntree: 5000,
          },
          beneficiaresType: [
            {
              id: 'ConjointDefautEnfant',
              libelle: 'Conjoint a defaut les enfants',
              occurances: 1
            },
            {
              id: 'ConJoint_Conjointe',
              libelle: 'Le conjoint',
              occurances: 1
            },
            {
              id: 'Autre',
              libelle: 'Autres',
              occurances: 6
            },
            {
              id: 'EnfantsNesOuANaitre',
              libelle: 'Enfants nées ou à naitre',
              occurances: 6
            }
          ],
          modeReglements: [
            {
              ligne: 0,
              code: 'M',
              libelle: 'Mobile Money'
            },
            {
              ligne: 1,
              code: 'E',
              libelle: 'Espèce'
            },
            {
              ligne: 2,
              code: 'B',
              libelle: 'Bancaire',
              field: {
                id: 'txtNumeroCompte',
                required: true
              }
            },
            {
              ligne: 3,
              code: 'Visa',
              libelle: 'Visa',
              field: {
                id: 'txtCompteVisa',
                required: true
              }
            }
          ],
          fractionnements: [
            {
              id: 'Mensuelle',
              ligne: 0,
              code: 'Mensuelle',
              libelle: 'Mensuelle'
            },
            {
              id: 'Trimestrielle',
              ligne: 1,
              code: 'Trimestrielle',
              libelle: 'Trimestrielle'
            },
            {
              id: 'Semestrielle',
              ligne: 2,
              code: 'Semestrielle',
              libelle: 'Semestrielle'
            },
            {
              id: 'Annuelle',
              ligne: 3,
              code: 'Annuelle',
              libelle: 'Annuelle'
            }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'IES6',
              libelle: 'Epargne IXPERTA Capital Plus',
              required: true,
              ageMinimum: '18',
              ageMax: '60',
              risques: [
                {
                  ligne: 0,
                  code: 'RPAR',
                  designation: 'Rachat Partiel',
                  libelle: 'Rachat Partiel'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            },
            {
              ligne: 1,
              type: 'DCS',
              code: 'IDS6',
              libelle: 'Décès IXPERTA Capital Plus',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'TIRA',
                  designation: 'Tirage au sort',
                  libelle: 'Tirage au sort'
                }
              ]
            },
            {
              ligne: 1,
              type: 'TIR',
              code: 'IDS6',
              libelle: 'Tirage IXPERTA Capital Plus',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'TIRA',
                  designation: 'Tirage au sort',
                  libelle: 'Tirage au sort'
                }
              ]
            }
          ]
        },
        {
          id: 12089,
          ligne: 1,
          code: '3120',
          imageUrl: 'ixperta_etude.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA ETUDES',
          famille: 'vie',
          nature: 'Mixte',
          capitalMinimum: 100000,
          capitalMax: 1000000,
          step: 100000,
          charge: {
            coutPiece: 1000,
            droitEntree: 5000,
          },
          rente: {
            unite: 'A',
            libelle: 'Ans',
            duree: [
              {
                ligne: 0,
                value: 3
              },
              {
                ligne: 1,
                value: 4
              },
              {
                ligne: 2,
                value: 5
              }
            ]
          },
          beneficiaresType: [
              {
                id: 'ConjointDefautEnfant',
                libelle: 'Conjoint a defaut les enfants',
                occurances: 1
              },
              {
                id: 'ConJoint_Conjointe',
                libelle: 'Le conjoint',
                occurances: 1
              },
              {
                id: 'Autre',
                libelle: 'Autres',
                occurances: 6
              },
              {
                id: 'EnfantsNesOuANaitre',
                libelle: 'Enfants nées ou à naitre',
                occurances: 6
              }
          ],
          fractionnements: [
              {
                id: 'Mensuelle',
                ligne: 0,
                code: 'Mensuelle',
                libelle: 'Mensuelle'
              },
              {
                id: 'Trimestrielle',
                ligne: 1,
                code: 'Trimestrielle',
                libelle: 'Trimestrielle'
              },
              {
                id: 'Semestrielle',
                ligne: 2,
                code: 'Semestrielle',
                libelle: 'Semestrielle'
              },
              {
                id: 'Annuelle',
                ligne: 3,
                code: 'Annuelle',
                libelle: 'Annuelle'
              }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'IRED',
              libelle: 'Rente Education',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            }
          ]
        },
        {
          id: 12076,
          ligne: 1,
          code: '2470',
          imageUrl: 'ixperta_pension_securite.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA PENSION SECURITE',
          famille: 'vie',
          nature: 'EpargnePrevoyanceIndividuelle',
          capitalMinimum: 300000,
          capitalMax: 999999,
          step: 100000,
          charge: {
            coutPiece: 1000,
            droitEntree: 5000,
          },
          rente: {
            unite: 'M',
            libelle: 'Mois',
            duree: [
              {
                ligne: 0,
                value: 12
              },
              {
                ligne: 1,
                value: 18
              },
              {
                ligne: 2,
                value: 24
              }
              ,
              {
                ligne: 2,
                value: 30
              },
              {
                ligne: 2,
                value: 36
              },
              {
                ligne: 2,
                value: 42
              },
              {
                ligne: 2,
                value: 48
              }
            ]
          },
          beneficiaresType: [
              {
                id: 'ConjointDefautEnfant',
                libelle: 'Conjoint a defaut les enfants',
                occurances: 1
              },
              {
                id: 'ConJoint_Conjointe',
                libelle: 'Le conjoint',
                occurances: 1
              },
              {
                id: 'Autre',
                libelle: 'Autres',
                occurances: 6
              },
              {
                id: 'EnfantsNesOuANaitre',
                libelle: 'Enfants nées ou à naitre',
                occurances: 6
              }
          ],
          fractionnements: [
            {
              id: 'Mensuelle',
              ligne: 0,
              code: 'Mensuelle',
              libelle: 'Mensuelle'
            },
            {
              id: 'Trimestrielle',
              ligne: 1,
              code: 'Trimestrielle',
              libelle: 'Trimestrielle'
            },
            {
              id: 'Semestrielle',
              ligne: 2,
              code: 'Semestrielle',
              libelle: 'Semestrielle'
            },
            {
              id: 'Annuelle',
              ligne: 3,
              code: 'Annuelle',
              libelle: 'Annuelle'
            }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'GES4',
              libelle: 'Epargne Retraite',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            },
            {
              ligne: 0,
              type: 'DCS',
              code: 'GDS4',
              libelle: 'Décès Toutes Causes',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            }
          ]
        },
        {
          id: 12079,
          ligne: 1,
          code: '2460',
          imageUrl: 'ixperta_pension_renfont.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA PENSION RENFORT',
          famille: 'vie',
          nature: 'EpargnePrevoyanceIndividuelle',
          capitalMinimum: 50000,
          capitalMax: 299999,
          step: 10000,
          charge: {
            coutPiece: 1000,
            droitEntree: 5000,
          },
          rente: {
            unite: 'M',
            libelle: 'Mois',
            duree: [
              {
                ligne: 0,
                value: 12
              },
              {
                ligne: 1,
                value: 18
              },
              {
                ligne: 2,
                value: 24
              }
              ,
              {
                ligne: 2,
                value: 30
              },
              {
                ligne: 2,
                value: 36
              },
              {
                ligne: 2,
                value: 42
              },
              {
                ligne: 2,
                value: 48
              }
            ]
          },
          beneficiaresType: [
              {
                id: 'ConjointDefautEnfant',
                libelle: 'Conjoint a defaut les enfants',
                occurances: 1
              },
              {
                id: 'ConJoint_Conjointe',
                libelle: 'Le conjoint',
                occurances: 1
              },
              {
                id: 'Autre',
                libelle: 'Autres',
                occurances: 6
              },
              {
                id: 'EnfantsNesOuANaitre',
                libelle: 'Enfants nées ou à naitre',
                occurances: 6
              }
          ],
          fractionnements: [
              {
                id: 'Mensuelle',
                ligne: 0,
                code: 'Mensuelle',
                libelle: 'Mensuelle'
              },
              {
                id: 'Trimestrielle',
                ligne: 1,
                code: 'Trimestrielle',
                libelle: 'Trimestrielle'
              },
              {
                id: 'Semestrielle',
                ligne: 2,
                code: 'Semestrielle',
                libelle: 'Semestrielle'
              },
              {
                id: 'Annuelle',
                ligne: 3,
                code: 'Annuelle',
                libelle: 'Annuelle'
              }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'GES4',
              libelle: 'Epargne Retraite',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            },
            {
              ligne: 0,
              type: 'DCS',
              code: 'GDS4',
              libelle: 'Décès Toutes Causes',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            }
          ]
        },
        {
          id: 12082,
          ligne: 1,
          code: '2480',
          imageUrl: 'ixperta_pension_confort.jpg',
          descriptionHtml: '<div class="row"><div class="col-md-3"><div class="user"></div></div><div class="col-md-9"><table style="width:100%" class="table table-bordered bg-white"><tr><th>NOM</th><td>IXPERTA PRODUIT</td></tr><tr><th>TYPE</th><td>Contrat individuel d’épargne avec une garantie complémentaire et optionnelle décès. La garantie décès prend effet après 06 mois de cotisation effective, sauf en cas de décès accidentel où elle est immédiate. Elle est égale à au plus 10 fois la cotisation annuelle avec un plafond de dix millions de francs (10 000 000 FCFA).</td></tr><tr><th>OBJET</th><td>Le contrat IXPERTA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire.</td></tr><tr><th>ADHERENTS</th><td>Toute personne physique âgée de 12 ans au moins et 53 ans au plus au moment de la souscription.</td></tr><tr><th>DUREE DU CONTRAT</th><td>Le contrat IXPERTA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 07 ans.</td></tr><tr><th>MODE DE PAIEMENT</th><td>Les primes sont payables par ; prélèvement bancaire, chèque ou espèces au siège de la compagnie. Les règlements par chèque ou en espèces son exclus dans le cas de paiement mensuel.</td></tr><tr><th>CAPITAUX GARANTIS</th><td><b>En cas de vie :</b> versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 % ,augmentée des participations au bénéfices(PB) et une prime de fidélité(PF). Les PB sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques. Les PF sont versées après la 5ième , 10ième , 15ième année d’assurance aux contractants qui ont payé régulièrement leurs cotisations et qui n’ont procédé à aucune opération d’avance et de rachat partiel. Elles sont égales respectivement à 20%, 40%, 60% de la cotisation de la première année d’assurance.<br> <b>En cas de décès avant le terme :</b> paiement du cumul des primes versées, nettes de chargement, capitalisées au taux d’intérêt technique minimum annuel de 3,5 % ,augmentées des participations au bénéfices. Le capital décès est également payé si l’assuré a souscrit à la garantie décès.</td></tr><tr><th>COTISATIONS</th><td>La prime minimale mensuelle est de 10 000 FCFA. Les frais accessoires sont de 1000 FCFA, payables selon la périodicité choisie : mensuelle, trimestrielle, semestrielle, annuelle.</td></tr><tr><th>CESSATION DE GARANTIES</th><td>Les garanties cessent:<br> - en cas de décès de l’assuré<br> - au terme du contrat<br> - en cas de résiliation du contrat <br></td></tr><tr><th>RACHAT</th><td>Le rachat peut être partiel ou total.<br> Le droit de rachat est ouvert immédiatement.<br> Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable.<br> Le montant maximum accordé est égal à 85% de la valeur de rachat.<br> En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité.<br> Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.</td></tr></table><br></div></div>',
          uniteDuree: 'A',
          libelleDuree: 'An',
          libelle: 'IXPERTA PENSION CONFORT',
          famille: 'vie',
          nature: 'EpargnePrevoyanceIndividuelle',
          capitalMinimum: 1000000,
          capitalMax: 10000000,
          step: 200000,
          charge: {
            coutPiece: 1000,
            droitEntree: 5000,
          },
          rente: {
            unite: 'M',
            libelle: 'Mois',
            duree: [
              {
                ligne: 0,
                value: 12
              },
              {
                ligne: 1,
                value: 18
              },
              {
                ligne: 2,
                value: 24
              }
              ,
              {
                ligne: 2,
                value: 30
              },
              {
                ligne: 2,
                value: 36
              },
              {
                ligne: 2,
                value: 42
              },
              {
                ligne: 2,
                value: 48
              }
            ]
          },
          beneficiaresType: [
              {
                id: 'ConjointDefautEnfant',
                libelle: 'Conjoint a defaut les enfants',
                occurances: 1
              },
              {
                id: 'ConJoint_Conjointe',
                libelle: 'Le conjoint',
                occurances: 1
              },
              {
                id: 'Autre',
                libelle: 'Autres',
                occurances: 6
              },
              {
                id: 'EnfantsNesOuANaitre',
                libelle: 'Enfants nées ou à naitre',
                occurances: 6
              }
          ],
          fractionnements: [
              {
                id: 'Mensuelle',
                ligne: 0,
                code: 'Mensuelle',
                libelle: 'Mensuelle'
              },
              {
                id: 'Trimestrielle',
                ligne: 1,
                code: 'Trimestrielle',
                libelle: 'Trimestrielle'
              },
              {
                id: 'Semestrielle',
                ligne: 2,
                code: 'Semestrielle',
                libelle: 'Semestrielle'
              },
              {
                id: 'Annuelle',
                ligne: 3,
                code: 'Annuelle',
                libelle: 'Annuelle'
              }
          ],
          garanties: [
            {
              ligne: 0,
              type: 'EPG',
              code: 'GES4',
              libelle: 'Epargne Retraite',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            },
            {
              ligne: 0,
              type: 'DCS',
              code: 'GDS4',
              libelle: 'Décès Toutes Causes',
              required: true,
              ageMinimum: '18',
              ageMax: '64',
              risques: [
                {
                  ligne: 0,
                  code: 'AVNT',
                  designation: 'Avance',
                  libelle: 'Avance'
                },
                {
                  ligne: 1,
                  code: 'RTAT',
                  designation: 'Terme',
                  libelle: 'Rachat Total au Terme'
                },
                {
                  ligne: 2,
                  code: 'RTVT',
                  designation: 'Rachat Total',
                  libelle: 'Rachat Total avant Terme'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
