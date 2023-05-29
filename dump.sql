--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    followerid integer NOT NULL,
    followingid integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: following; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.following (
    followerid integer NOT NULL,
    followingid integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: post_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_likes (
    id integer NOT NULL,
    postid integer,
    userid integer,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: post_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_likes_id_seq OWNED BY public.post_likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    userid integer,
    image character varying(255),
    description text,
    likes integer DEFAULT 0 NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    userid integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    password character varying(255),
    profilepic character varying(255),
    biography character varying(200),
    email character varying(255),
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: post_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes ALTER COLUMN id SET DEFAULT nextval('public.post_likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.followers VALUES (8, 6, '2023-05-29 14:07:43.79023');
INSERT INTO public.followers VALUES (6, 8, '2023-05-29 14:10:21.595156');
INSERT INTO public.followers VALUES (7, 6, '2023-05-29 14:15:48.772374');
INSERT INTO public.followers VALUES (7, 8, '2023-05-29 14:16:09.856269');
INSERT INTO public.followers VALUES (6, 9, '2023-05-29 14:22:50.627862');
INSERT INTO public.followers VALUES (7, 9, '2023-05-29 14:22:53.943895');
INSERT INTO public.followers VALUES (8, 9, '2023-05-29 14:22:56.64256');
INSERT INTO public.followers VALUES (9, 8, '2023-05-29 14:23:21.876757');
INSERT INTO public.followers VALUES (9, 7, '2023-05-29 14:23:25.346703');
INSERT INTO public.followers VALUES (9, 6, '2023-05-29 14:23:27.718078');


--
-- Data for Name: following; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.following VALUES (7, 8, '2023-05-29 13:59:53.975586');
INSERT INTO public.following VALUES (7, 6, '2023-05-29 14:00:11.584674');
INSERT INTO public.following VALUES (6, 8, '2023-05-29 14:07:43.779127');
INSERT INTO public.following VALUES (8, 6, '2023-05-29 14:10:21.584548');
INSERT INTO public.following VALUES (6, 7, '2023-05-29 14:15:48.761451');
INSERT INTO public.following VALUES (8, 7, '2023-05-29 14:16:09.84541');
INSERT INTO public.following VALUES (9, 6, '2023-05-29 14:22:50.617032');
INSERT INTO public.following VALUES (9, 7, '2023-05-29 14:22:53.933119');
INSERT INTO public.following VALUES (9, 8, '2023-05-29 14:22:56.641899');
INSERT INTO public.following VALUES (8, 9, '2023-05-29 14:23:21.865435');
INSERT INTO public.following VALUES (7, 9, '2023-05-29 14:23:25.335699');
INSERT INTO public.following VALUES (6, 9, '2023-05-29 14:23:27.707063');


--
-- Data for Name: post_likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.post_likes VALUES (85, 7, 8, '2023-05-29 14:19:09.717089');
INSERT INTO public.post_likes VALUES (87, 7, 6, '2023-05-29 14:19:37.05376');
INSERT INTO public.post_likes VALUES (89, 7, 9, '2023-05-29 14:24:34.205229');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (7, 7, 'https://i0.wp.com/sociedadejedi.com.br/wp-content/uploads/2016/12/tatooine-binary-sunset-wall.jpg', '#TBT Tatooine', 26, '2023-05-28 23:50:43.553337');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (5, 'bd052c92-ae79-44f3-be15-0191bab58471', 6, '2023-05-29 13:06:00.700317');
INSERT INTO public.sessions VALUES (7, '70ba841d-e5f6-46b5-a0f9-c3ddba520b9f', 7, '2023-05-29 13:58:56.706395');
INSERT INTO public.sessions VALUES (8, 'ad8186ed-d85e-4310-8843-6de14737ba7a', 8, '2023-05-29 14:09:39.8523');
INSERT INTO public.sessions VALUES (9, 'f96759d9-7b4c-47bb-a2f0-b5cbb7274ec9', 7, '2023-05-29 14:12:43.376787');
INSERT INTO public.sessions VALUES (10, '483450e6-b7c0-47fb-8d1e-9bb7fb5d6df9', 9, '2023-05-29 14:22:05.767163');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (6, 'Darth Vader', '$2b$10$maIUEc5urizF/w4XxrnQnu.T0Xlhm60whZDTd7mXCRXhov1mqifVC', 'https://www.einerd.com.br/wp-content/uploads/2015/02/00-890x556.jpeg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quisquam praesentium, eius tenetur totam earum ea ut.', 'darthvader@gmail.com', NULL);
INSERT INTO public.users VALUES (7, 'Luke Skywalker', '$2b$10$FKXdANzoXG0mcnWLT4k48.He7ARzoJJq1MwFcgAYsHnqymD8G9lSG', 'https://pm1.narvii.com/6323/6b52db90115ebcb8a52295e39c9fe1e3c948400b_00.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quisquam praesentium, eius tenetur totam earum ea ut.', 'lukeskywalker@gmail.com', '2023-05-28 19:24:21.887');
INSERT INTO public.users VALUES (8, 'Leia Skywalker', '$2b$10$O68IXyIHuoy0sQBxEniBZOEBqRjazWoTcSNjeuK4tqBs.3JBIe9Be', 'https://themarysue.com/wp-content/uploads/2017/08/leiatop1.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'leiaskywalker@gmail.com', '2023-05-29 09:26:16.332764');
INSERT INTO public.users VALUES (9, 'Padmé Amidala', '$2b$10$UKQwik4H91XMbKHxsE82k.5nARbZf7LwOineVehZIx5r7baw3mk2a', 'https://i.pinimg.com/originals/f5/c5/52/f5c55259fef1a791cafa41d028e6d9de.jpg', 'Naboo queen', 'padmeamidala@gmail.com', '2023-05-29 14:21:46.316792');


--
-- Name: post_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_likes_id_seq', 90, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 8, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: followers pk_followers; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT pk_followers PRIMARY KEY (followerid, followingid);


--
-- Name: following pk_following; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.following
    ADD CONSTRAINT pk_following PRIMARY KEY (followerid, followingid);


--
-- Name: post_likes post_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: post_likes unique_post_user_like; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT unique_post_user_like UNIQUE (postid, userid);


--
-- Name: post_likes unique_post_user_likes; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT unique_post_user_likes UNIQUE (postid, userid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: followers fk_followers_followerid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT fk_followers_followerid FOREIGN KEY (followerid) REFERENCES public.users(id);


--
-- Name: followers fk_followers_followingid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT fk_followers_followingid FOREIGN KEY (followingid) REFERENCES public.users(id);


--
-- Name: following fk_following_followerid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.following
    ADD CONSTRAINT fk_following_followerid FOREIGN KEY (followerid) REFERENCES public.users(id);


--
-- Name: following fk_following_followingid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.following
    ADD CONSTRAINT fk_following_followingid FOREIGN KEY (followingid) REFERENCES public.users(id);


--
-- Name: post_likes fk_postlikes_postid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT fk_postlikes_postid FOREIGN KEY (postid) REFERENCES public.posts(id);


--
-- Name: post_likes fk_postlikes_userid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT fk_postlikes_userid FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- Name: posts fk_posts_userid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_posts_userid FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- Name: sessions fk_sessions_userid; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT fk_sessions_userid FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

