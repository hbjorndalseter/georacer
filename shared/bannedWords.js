export const STOTENDE_ORD = [
    "hore", "fitte", "jævla", "faen", "soper", "homo", "nigger", "neger", "pakkis",
    "jævlig", "drit", "idiot", "mongo", "retard", "hestkuk", "ræv", "bitch", "sløtt",
    "fuck", "shit", "bitch", "cunt", "nigger", "retard", "slut", "whore", "fag",
    "faggot", "bastard", "asshole", "dick", "pussy", "twat", "motherfucker", "nigga",
    "kike", "chink", "spic", "raghead", "terrorist", "gook", "wetback", "white trash",
    "sandnigger", "tranny", "ape", "uncle tom", "gypsy", "jungle bunny", "camel jockey"
  ];

  export const isOffensive = (input) => {
    const cleaned = input.toLowerCase().replace(/\s+/g, '');
    return STOTENDE_ORD.some(word => cleaned.includes(word));
  };