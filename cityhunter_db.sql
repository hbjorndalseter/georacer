--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg110+2)
-- Dumped by pg_dump version 17.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."SpacialQuestion" DROP CONSTRAINT "SpacialQuestion_cityMapId_nodeId_fkey";
ALTER TABLE ONLY public."RiddleQuestion" DROP CONSTRAINT "RiddleQuestion_cityMapId_nodeId_fkey";
ALTER TABLE ONLY public."Player" DROP CONSTRAINT "Player_cityMapId_fkey";
ALTER TABLE ONLY public."Node" DROP CONSTRAINT "Node_cityMapId_fkey";
ALTER TABLE ONLY public."FactQuestion" DROP CONSTRAINT "FactQuestion_cityMapId_nodeId_fkey";
ALTER TABLE ONLY public."Edge" DROP CONSTRAINT "Edge_cityMapId_node2Id_fkey";
ALTER TABLE ONLY public."Edge" DROP CONSTRAINT "Edge_cityMapId_node1Id_fkey";
DROP INDEX public."Player_name_cityMapId_key";
ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
ALTER TABLE ONLY public."SpacialQuestion" DROP CONSTRAINT "SpacialQuestion_pkey";
ALTER TABLE ONLY public."RiddleQuestion" DROP CONSTRAINT "RiddleQuestion_pkey";
ALTER TABLE ONLY public."Player" DROP CONSTRAINT "Player_pkey";
ALTER TABLE ONLY public."Node" DROP CONSTRAINT "Node_pkey";
ALTER TABLE ONLY public."FactQuestion" DROP CONSTRAINT "FactQuestion_pkey";
ALTER TABLE ONLY public."Edge" DROP CONSTRAINT "Edge_pkey";
ALTER TABLE ONLY public."CityMap" DROP CONSTRAINT "CityMap_pkey";
ALTER TABLE public."SpacialQuestion" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."RiddleQuestion" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Player" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."FactQuestion" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."CityMap" ALTER COLUMN id DROP DEFAULT;
DROP TABLE public._prisma_migrations;
DROP SEQUENCE public."SpacialQuestion_id_seq";
DROP TABLE public."SpacialQuestion";
DROP SEQUENCE public."RiddleQuestion_id_seq";
DROP TABLE public."RiddleQuestion";
DROP SEQUENCE public."Player_id_seq";
DROP TABLE public."Player";
DROP TABLE public."Node";
DROP SEQUENCE public."FactQuestion_id_seq";
DROP TABLE public."FactQuestion";
DROP TABLE public."Edge";
DROP SEQUENCE public."CityMap_id_seq";
DROP TABLE public."CityMap";
DROP SCHEMA topology;
DROP SCHEMA tiger_data;
DROP SCHEMA tiger;
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger;


--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger_data;


--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA topology;


--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CityMap; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CityMap" (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: CityMap_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CityMap_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: CityMap_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CityMap_id_seq" OWNED BY public."CityMap".id;


--
-- Name: Edge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Edge" (
    "cityMapId" integer NOT NULL,
    "node1Id" integer NOT NULL,
    "node2Id" integer NOT NULL
);


--
-- Name: FactQuestion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FactQuestion" (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    score integer NOT NULL,
    hint text NOT NULL,
    "cityMapId" integer NOT NULL,
    "nodeId" integer NOT NULL
);


--
-- Name: FactQuestion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."FactQuestion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: FactQuestion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."FactQuestion_id_seq" OWNED BY public."FactQuestion".id;


--
-- Name: Node; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Node" (
    id integer NOT NULL,
    "cityMapId" integer NOT NULL,
    lat double precision NOT NULL,
    lng double precision NOT NULL
);


--
-- Name: Player; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Player" (
    id integer NOT NULL,
    name text NOT NULL,
    score integer NOT NULL,
    "cityMapId" integer NOT NULL
);


--
-- Name: Player_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Player_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Player_id_seq" OWNED BY public."Player".id;


--
-- Name: RiddleQuestion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RiddleQuestion" (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    score integer NOT NULL,
    hint text NOT NULL,
    "cityMapId" integer NOT NULL,
    "nodeId" integer NOT NULL
);


--
-- Name: RiddleQuestion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."RiddleQuestion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: RiddleQuestion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."RiddleQuestion_id_seq" OWNED BY public."RiddleQuestion".id;


--
-- Name: SpacialQuestion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SpacialQuestion" (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    score integer NOT NULL,
    hint text NOT NULL,
    "cityMapId" integer NOT NULL,
    "nodeId" integer NOT NULL
);


--
-- Name: SpacialQuestion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SpacialQuestion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: SpacialQuestion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SpacialQuestion_id_seq" OWNED BY public."SpacialQuestion".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: CityMap id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CityMap" ALTER COLUMN id SET DEFAULT nextval('public."CityMap_id_seq"'::regclass);


--
-- Name: FactQuestion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FactQuestion" ALTER COLUMN id SET DEFAULT nextval('public."FactQuestion_id_seq"'::regclass);


--
-- Name: Player id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Player" ALTER COLUMN id SET DEFAULT nextval('public."Player_id_seq"'::regclass);


--
-- Name: RiddleQuestion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RiddleQuestion" ALTER COLUMN id SET DEFAULT nextval('public."RiddleQuestion_id_seq"'::regclass);


--
-- Name: SpacialQuestion id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SpacialQuestion" ALTER COLUMN id SET DEFAULT nextval('public."SpacialQuestion_id_seq"'::regclass);


--
-- Data for Name: CityMap; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CityMap" (id, name) FROM stdin;
1	Trondheim
2	Oslo
3	Stavanger
4	Bergen
\.


--
-- Data for Name: Edge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Edge" ("cityMapId", "node1Id", "node2Id") FROM stdin;
1	7	8
1	8	9
1	9	10
1	10	11
1	11	12
1	12	13
1	13	14
1	14	15
1	14	28
1	15	16
1	15	22
2	3	4
1	16	17
1	16	25
1	17	18
1	17	24
1	18	19
1	18	23
1	19	20
1	20	21
1	21	22
1	23	24
1	24	25
1	25	26
1	26	27
1	26	35
1	27	28
1	27	33
1	28	29
1	29	30
1	29	32
1	29	37
1	30	31
1	30	36
1	31	34
1	32	33
1	33	34
1	34	35
1	36	37
1	36	51
1	37	38
1	38	39
1	38	56
1	39	40
1	40	41
1	41	42
1	42	43
2	1	2
2	2	3
1	1	2
1	2	3
1	2	22
1	2	14
1	3	4
1	3	12
1	4	11
1	4	5
1	5	6
1	6	7
1	43	44
1	44	45
1	45	46
1	45	63
1	46	47
1	47	48
1	47	59
1	48	49
1	48	52
1	49	50
1	50	51
1	52	53
1	53	54
1	54	55
1	54	59
1	55	56
1	56	57
1	57	58
1	57	60
1	58	59
1	60	61
1	60	63
1	61	62
2	4	5
2	5	6
2	6	7
2	7	8
1	36	53
1	56	64
1	61	64
1	42	64
1	64	65
1	65	66
1	38	66
1	41	66
1	13	67
1	67	68
1	68	76
1	70	71
1	70	75
1	71	72
1	72	73
1	8	72
1	40	73
1	7	73
1	10	75
1	11	76
\.


--
-- Data for Name: FactQuestion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."FactQuestion" (id, question, answer, score, hint, "cityMapId", "nodeId") FROM stdin;
4	Til høyre for deg ligger Deloitte. Hvilket land er det opprinnelig fra?	USA	10	Kjør mot Operaen og Deichman	2	3
5	Deloitte har over 450.000 ansatte globalt, men hvor mange ansatte er det i Norge?	2000	20	Fortsett mot Oslo Sentralstasjon	2	4
6	Deloitte har 2000 ansatte i Norge, men fordelt på hvor mange kontor?	19	20	Kjør mot Jernbanetorget via Skippergata	2	8
7	Hvilket museum ligger her?	Vitenskapsmuseet	30	Kjør til NTNU Kalvskinnet	1	17
8	Når åpnet Britannia etter Reitan AS kjøpte og restaurerte det?	2019	40	Kjør til Britannia	1	38
2	Hva heter broen du ser til høyre i kartet?	Gamle Bybro	100	Kjør oppover Munkegata og ta til høyre	1	7
1	Hvilket historisk bygg ligger rett ved oss nå?	Nidarosdomen	10	Ta til høyre	1	4
\.


--
-- Data for Name: Node; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Node" (id, "cityMapId", lat, lng) FROM stdin;
1	1	63.424606	10.393879
2	1	63.427519	10.393034
3	1	63.427546	10.393798
4	1	63.427698	10.396569
5	1	63.427847	10.398534
6	1	63.427955	10.39979
7	1	63.428796	10.400348
8	1	63.428848	10.398774
9	1	63.428878	10.3981
10	1	63.428898	10.397234
11	1	63.428926	10.395902
12	1	63.429006	10.394116
13	1	63.429027	10.39351
14	1	63.429064	10.39264
15	1	63.429201	10.389207
16	1	63.429235	10.388362
17	1	63.429262	10.386978
18	1	63.429304	10.385358
19	1	63.428441	10.385155
20	1	63.428187	10.385803
21	1	63.427327	10.387465
22	1	63.427362	10.389584
23	1	63.429717	10.385415
24	1	63.4298	10.387067
25	1	63.429871	10.388328
26	1	63.430474	10.388136
27	1	63.430602	10.390426
28	1	63.430599	10.392178
29	1	63.431969	10.391869
30	1	63.433034	10.39155
31	1	63.432688	10.39042
32	1	63.431934	10.390739
33	1	63.431878	10.3898
34	1	63.432379	10.389333
35	1	63.431883	10.387327
1	2	59.906976	10.76189
2	2	59.907563	10.759425
3	2	59.907974	10.757778
36	1	63.433191	10.393619
37	1	63.43199	10.394206
38	1	63.431922	10.400183
39	1	63.430326	10.399931
40	1	63.430248	10.401349
41	1	63.431844	10.402683
42	1	63.433085	10.40372
43	1	63.434244	10.404688
44	1	63.434578	10.404955
45	1	63.434697	10.400183
46	1	63.434643	10.399184
47	1	63.434503	10.39708
48	1	63.434367	10.395555
49	1	63.434101	10.394252
50	1	63.433736	10.39336
51	1	63.433405	10.393467
52	1	63.433867	10.395668
53	1	63.433245	10.395788
54	1	63.433299	10.397338
55	1	63.4333	10.398824
56	1	63.433326	10.40016
57	1	63.433881	10.40017
58	1	63.433905	10.399032
59	1	63.433933	10.397158
60	1	63.434079	10.400228
61	1	63.43381	10.402967
62	1	63.434337	10.403393
63	1	63.434393	10.400223
4	2	59.909633	10.750986
5	2	59.909629	10.750551
6	2	59.909919	10.749444
7	2	59.910394	10.747506
8	2	59.911433	10.748453
64	1	63.433319	10.402487
65	1	63.43259	10.401635
66	1	63.431897	10.401308
67	1	63.429618	10.393639
68	1	63.429833	10.395422
69	1	63.429984	10.395283
70	1	63.429794	10.397373
71	1	63.429757	10.398049
72	1	63.429701	10.39892
73	1	63.429725	10.401025
74	1	63.429327	10.398055
75	1	63.429407	10.397298
76	1	63.429555	10.395579
\.


--
-- Data for Name: Player; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Player" (id, name, score, "cityMapId") FROM stdin;
89	tjohie	0	2
90	heiheiheihieh	0	2
91	tjalle	0	2
92	Tjalle1	0	2
94	jhsqkwjgsqw	0	2
95	aksjdhaskjdhask	0	2
62	Åmund	0	2
61	Hjalmar	1050	2
67	kriss	1000	2
51	Oh Yeah	0	2
70	hei	207	2
73	3	0	2
77	heiheihei	0	2
\.


--
-- Data for Name: RiddleQuestion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RiddleQuestion" (id, question, answer, score, hint, "cityMapId", "nodeId") FROM stdin;
\.


--
-- Data for Name: SpacialQuestion; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SpacialQuestion" (id, question, answer, score, hint, "cityMapId", "nodeId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5ad1d3c2-cbc3-4bbe-b9bb-0a99914bb55b	91b07cf06cb334a757195fdeb309023637b81fd234fedc17730ce5f862377c7b	2025-03-18 08:16:06.698966+00	20250318081604_init	\N	\N	2025-03-18 08:16:05.649425+00	1
45158859-8546-4bae-a976-09503813f0d4	2100b9edc0da5aaec4b6f5272343140db6699686501eefe4f62226b517d843cf	2025-03-18 09:00:58.229762+00	20250318090056_change_relations	\N	\N	2025-03-18 09:00:57.348845+00	1
fa6aacfe-8cc3-4294-b57f-6cd3c730df73	c70c4b04f91f3213a531cb2af8f77b89b8c2e20106fc6f5d35418d948a14cfca	2025-03-18 09:19:20.14201+00	20250318091918_change_question_relations	\N	\N	2025-03-18 09:19:19.281693+00	1
7aae87e5-f1ec-478a-a234-850f5bd4d3f4	381ba8f95eefe31e970e62c9ab6e9505822ee46f1fffa5235de127b1f3f0cbf3	2025-03-18 09:22:12.259919+00	20250318092210_change_question_relations	\N	\N	2025-03-18 09:22:11.328018+00	1
bffe2048-4c6f-4897-b285-4fba4fdb3775	4cfbaa912b1f54f04111d00895012d30f0c044f6fc8dadbd3f3b8153637dd4f2	2025-03-18 09:39:41.397724+00	20250318093939_add_citymap_relation	\N	\N	2025-03-18 09:39:40.50639+00	1
201e0d46-7249-400d-8d5a-0c34fdff8e98	b341e231d000935da1e57c1e9b59dc3fd2f3b42ef18c19c6c6513971a5a71e39	2025-03-18 12:46:17.698239+00	20250318124615_allow_same_name_in_different_cities	\N	\N	2025-03-18 12:46:16.79919+00	1
551ef992-d4a2-47fa-a40a-75d2bf8a20c3	a91d7a18ec25e39c73e0ecb3c1a3f9895f553c0d1643d1c75c82842ec1c923f6	2025-03-18 13:38:07.420316+00	20250318133805_removed_is_intersection	\N	\N	2025-03-18 13:38:06.559326+00	1
\.


--
-- Name: CityMap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CityMap_id_seq"', 1, false);


--
-- Name: FactQuestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."FactQuestion_id_seq"', 1, false);


--
-- Name: Player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Player_id_seq"', 95, true);


--
-- Name: RiddleQuestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RiddleQuestion_id_seq"', 1, false);


--
-- Name: SpacialQuestion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SpacialQuestion_id_seq"', 1, false);


--
-- Name: CityMap CityMap_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CityMap"
    ADD CONSTRAINT "CityMap_pkey" PRIMARY KEY (id);


--
-- Name: Edge Edge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Edge"
    ADD CONSTRAINT "Edge_pkey" PRIMARY KEY ("cityMapId", "node1Id", "node2Id");


--
-- Name: FactQuestion FactQuestion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FactQuestion"
    ADD CONSTRAINT "FactQuestion_pkey" PRIMARY KEY (id);


--
-- Name: Node Node_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Node"
    ADD CONSTRAINT "Node_pkey" PRIMARY KEY ("cityMapId", id);


--
-- Name: Player Player_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_pkey" PRIMARY KEY (id);


--
-- Name: RiddleQuestion RiddleQuestion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RiddleQuestion"
    ADD CONSTRAINT "RiddleQuestion_pkey" PRIMARY KEY (id);


--
-- Name: SpacialQuestion SpacialQuestion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SpacialQuestion"
    ADD CONSTRAINT "SpacialQuestion_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Player_name_cityMapId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Player_name_cityMapId_key" ON public."Player" USING btree (name, "cityMapId");


--
-- Name: Edge Edge_cityMapId_node1Id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Edge"
    ADD CONSTRAINT "Edge_cityMapId_node1Id_fkey" FOREIGN KEY ("cityMapId", "node1Id") REFERENCES public."Node"("cityMapId", id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Edge Edge_cityMapId_node2Id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Edge"
    ADD CONSTRAINT "Edge_cityMapId_node2Id_fkey" FOREIGN KEY ("cityMapId", "node2Id") REFERENCES public."Node"("cityMapId", id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: FactQuestion FactQuestion_cityMapId_nodeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FactQuestion"
    ADD CONSTRAINT "FactQuestion_cityMapId_nodeId_fkey" FOREIGN KEY ("cityMapId", "nodeId") REFERENCES public."Node"("cityMapId", id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Node Node_cityMapId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Node"
    ADD CONSTRAINT "Node_cityMapId_fkey" FOREIGN KEY ("cityMapId") REFERENCES public."CityMap"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Player Player_cityMapId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_cityMapId_fkey" FOREIGN KEY ("cityMapId") REFERENCES public."CityMap"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RiddleQuestion RiddleQuestion_cityMapId_nodeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RiddleQuestion"
    ADD CONSTRAINT "RiddleQuestion_cityMapId_nodeId_fkey" FOREIGN KEY ("cityMapId", "nodeId") REFERENCES public."Node"("cityMapId", id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SpacialQuestion SpacialQuestion_cityMapId_nodeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SpacialQuestion"
    ADD CONSTRAINT "SpacialQuestion_cityMapId_nodeId_fkey" FOREIGN KEY ("cityMapId", "nodeId") REFERENCES public."Node"("cityMapId", id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

