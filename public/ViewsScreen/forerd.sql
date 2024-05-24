--
-- PostgreSQL database dump
--

-- Dumped from database version 13.14 (Debian 13.14-1.pgdg120+2)
-- Dumped by pg_dump version 13.14

-- Started on 2024-05-24 20:22:43 UTC

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

--
-- TOC entry 5 (class 2615 OID 16619)
-- Name: public; Type: SCHEMA; Schema: -; Owner: docker
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO docker;

--
-- TOC entry 3141 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: docker
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 647 (class 1247 OID 16621)
-- Name: user_role; Type: DOMAIN; Schema: public; Owner: docker
--

CREATE DOMAIN public.user_role AS character varying(255)
	CONSTRAINT role_name CHECK ((((VALUE)::text = 'admin'::text) OR ((VALUE)::text = 'normal'::text) OR ((VALUE)::text = 'restaurateur'::text)));


ALTER DOMAIN public.user_role OWNER TO docker;

--
-- TOC entry 223 (class 1255 OID 16623)
-- Name: add_friendship(integer, integer); Type: FUNCTION; Schema: public; Owner: docker
--

CREATE FUNCTION public.add_friendship(p_member1_id integer, p_member2_id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF p_member1_id < p_member2_id THEN
        INSERT INTO public.friendships (member1_id, member2_id, created_at) VALUES (p_member1_id, p_member2_id, NOW());
    ELSE
        RAISE EXCEPTION 'Invalid friendship. Member1_id must be less than Member2_id.';
    END IF;
END;
$$;


ALTER FUNCTION public.add_friendship(p_member1_id integer, p_member2_id integer) OWNER TO docker;

--
-- TOC entry 224 (class 1255 OID 16624)
-- Name: update_visited_places_count(); Type: FUNCTION; Schema: public; Owner: docker
--

CREATE FUNCTION public.update_visited_places_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE public.profile
    SET visited_places = (SELECT COUNT(*) FROM public.visited_places WHERE user_id = NEW.user_id)
    WHERE user_id = NEW.user_id;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_visited_places_count() OWNER TO docker;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16630)
-- Name: cuisine_types; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.cuisine_types (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    icon character varying(255)
);


ALTER TABLE public.cuisine_types OWNER TO docker;

--
-- TOC entry 204 (class 1259 OID 16658)
-- Name: cuisine_types_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.cuisine_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cuisine_types_id_seq OWNER TO docker;

--
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 204
-- Name: cuisine_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.cuisine_types_id_seq OWNED BY public.cuisine_types.id;


--
-- TOC entry 205 (class 1259 OID 16660)
-- Name: favorite_restaurants; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.favorite_restaurants (
    user_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.favorite_restaurants OWNER TO docker;

--
-- TOC entry 206 (class 1259 OID 16663)
-- Name: favorite_restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.favorite_restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorite_restaurants_id_seq OWNER TO docker;

--
-- TOC entry 3143 (class 0 OID 0)
-- Dependencies: 206
-- Name: favorite_restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.favorite_restaurants_id_seq OWNED BY public.favorite_restaurants.id;


--
-- TOC entry 207 (class 1259 OID 16665)
-- Name: friendships; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.friendships (
    friendship_id integer NOT NULL,
    member1_id integer NOT NULL,
    member2_id integer NOT NULL
);


ALTER TABLE public.friendships OWNER TO docker;

--
-- TOC entry 211 (class 1259 OID 16690)
-- Name: friendships_friendship_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.friendships_friendship_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.friendships_friendship_id_seq OWNER TO docker;

--
-- TOC entry 3144 (class 0 OID 0)
-- Dependencies: 211
-- Name: friendships_friendship_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.friendships_friendship_id_seq OWNED BY public.friendships.friendship_id;


--
-- TOC entry 208 (class 1259 OID 16668)
-- Name: locations; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    address character varying(255) NOT NULL,
    latitude double precision,
    longitude double precision,
    city character varying(255) NOT NULL
);


ALTER TABLE public.locations OWNER TO docker;

--
-- TOC entry 212 (class 1259 OID 16692)
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO docker;

--
-- TOC entry 3145 (class 0 OID 0)
-- Dependencies: 212
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- TOC entry 209 (class 1259 OID 16671)
-- Name: profile; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    bio text,
    picture_path character varying DEFAULT 'public\data\default_profile_photo.jpg'::character varying,
    visited_places bigint DEFAULT 0
);


ALTER TABLE public.profile OWNER TO docker;

--
-- TOC entry 213 (class 1259 OID 16694)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_id_seq OWNER TO docker;

--
-- TOC entry 214 (class 1259 OID 16696)
-- Name: profile_id_seq1; Type: SEQUENCE; Schema: public; Owner: docker
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq1
    START WITH 100
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16698)
-- Name: restaurant_cuisines; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.restaurant_cuisines (
    restaurant_id integer NOT NULL,
    cuisine_type_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.restaurant_cuisines OWNER TO docker;

--
-- TOC entry 216 (class 1259 OID 16701)
-- Name: restaurant_cuisines_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.restaurant_cuisines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurant_cuisines_id_seq OWNER TO docker;

--
-- TOC entry 3146 (class 0 OID 0)
-- Dependencies: 216
-- Name: restaurant_cuisines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.restaurant_cuisines_id_seq OWNED BY public.restaurant_cuisines.id;


--
-- TOC entry 210 (class 1259 OID 16679)
-- Name: restaurants; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    location_id integer,
    image_path character varying(255)
);


ALTER TABLE public.restaurants OWNER TO docker;

--
-- TOC entry 217 (class 1259 OID 16703)
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_id_seq OWNER TO docker;

--
-- TOC entry 3147 (class 0 OID 0)
-- Dependencies: 217
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- TOC entry 201 (class 1259 OID 16636)
-- Name: reviews; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    restaurant_id integer,
    rating integer,
    comment text,
    date_added timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    food_ordered text,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO docker;

--
-- TOC entry 218 (class 1259 OID 16705)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO docker;

--
-- TOC entry 3148 (class 0 OID 0)
-- Dependencies: 218
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 202 (class 1259 OID 16644)
-- Name: user_cuisine_preferences; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.user_cuisine_preferences (
    user_id integer NOT NULL,
    cuisine_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.user_cuisine_preferences OWNER TO docker;

--
-- TOC entry 219 (class 1259 OID 16707)
-- Name: user_cuisine_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.user_cuisine_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_cuisine_preferences_id_seq OWNER TO docker;

--
-- TOC entry 3149 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_cuisine_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.user_cuisine_preferences_id_seq OWNED BY public.user_cuisine_preferences.id;


--
-- TOC entry 203 (class 1259 OID 16647)
-- Name: users; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    role character varying(255) NOT NULL,
    profile_id integer
);


ALTER TABLE public.users OWNER TO docker;

--
-- TOC entry 220 (class 1259 OID 16709)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO docker;

--
-- TOC entry 3150 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 221 (class 1259 OID 16711)
-- Name: visited_places; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.visited_places (
    id integer NOT NULL,
    user_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    visit_date date NOT NULL
);


ALTER TABLE public.visited_places OWNER TO docker;

--
-- TOC entry 222 (class 1259 OID 16714)
-- Name: visited_places_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.visited_places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.visited_places_id_seq OWNER TO docker;

--
-- TOC entry 3151 (class 0 OID 0)
-- Dependencies: 222
-- Name: visited_places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.visited_places_id_seq OWNED BY public.visited_places.id;


--
-- TOC entry 2950 (class 2604 OID 16717)
-- Name: cuisine_types id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.cuisine_types ALTER COLUMN id SET DEFAULT nextval('public.cuisine_types_id_seq'::regclass);


--
-- TOC entry 2956 (class 2604 OID 16718)
-- Name: favorite_restaurants id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.favorite_restaurants ALTER COLUMN id SET DEFAULT nextval('public.favorite_restaurants_id_seq'::regclass);


--
-- TOC entry 2957 (class 2604 OID 16719)
-- Name: friendships friendship_id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.friendships ALTER COLUMN friendship_id SET DEFAULT nextval('public.friendships_friendship_id_seq'::regclass);


--
-- TOC entry 2958 (class 2604 OID 16720)
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- TOC entry 2962 (class 2604 OID 16721)
-- Name: restaurant_cuisines id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.restaurant_cuisines ALTER COLUMN id SET DEFAULT nextval('public.restaurant_cuisines_id_seq'::regclass);


--
-- TOC entry 2961 (class 2604 OID 16722)
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- TOC entry 2952 (class 2604 OID 16723)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 2954 (class 2604 OID 16724)
-- Name: user_cuisine_preferences id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.user_cuisine_preferences ALTER COLUMN id SET DEFAULT nextval('public.user_cuisine_preferences_id_seq'::regclass);


--
-- TOC entry 2955 (class 2604 OID 16725)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2963 (class 2604 OID 16726)
-- Name: visited_places id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.visited_places ALTER COLUMN id SET DEFAULT nextval('public.visited_places_id_seq'::regclass);


--
-- TOC entry 2983 (class 2606 OID 16728)
-- Name: profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- TOC entry 2965 (class 2606 OID 16734)
-- Name: cuisine_types cuisine_types_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.cuisine_types
    ADD CONSTRAINT cuisine_types_pkey PRIMARY KEY (id);


--
-- TOC entry 2967 (class 2606 OID 16736)
-- Name: cuisine_types cuisine_types_type_key; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.cuisine_types
    ADD CONSTRAINT cuisine_types_type_key UNIQUE (type);


--
-- TOC entry 2975 (class 2606 OID 16738)
-- Name: favorite_restaurants favorite_restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.favorite_restaurants
    ADD CONSTRAINT favorite_restaurants_pkey PRIMARY KEY (user_id, restaurant_id);


--
-- TOC entry 2977 (class 2606 OID 16740)
-- Name: friendships friendships_member1_id_member2_id_key; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_member1_id_member2_id_key UNIQUE (member1_id, member2_id);


--
-- TOC entry 2979 (class 2606 OID 16742)
-- Name: friendships friendships_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_pkey PRIMARY KEY (friendship_id);


--
-- TOC entry 2981 (class 2606 OID 16744)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- TOC entry 2987 (class 2606 OID 16746)
-- Name: restaurant_cuisines restaurant_cuisines_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.restaurant_cuisines
    ADD CONSTRAINT restaurant_cuisines_pkey PRIMARY KEY (restaurant_id, cuisine_type_id);


--
-- TOC entry 2985 (class 2606 OID 16748)
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- TOC entry 2969 (class 2606 OID 16750)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 2971 (class 2606 OID 16752)
-- Name: user_cuisine_preferences user_cuisine_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.user_cuisine_preferences
    ADD CONSTRAINT user_cuisine_preferences_pkey PRIMARY KEY (user_id, cuisine_id);


--
-- TOC entry 2973 (class 2606 OID 16754)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2989 (class 2606 OID 16756)
-- Name: visited_places visited_places_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.visited_places
    ADD CONSTRAINT visited_places_pkey PRIMARY KEY (id);


--
-- TOC entry 3005 (class 2620 OID 16757)
-- Name: visited_places after_insert_visited_places; Type: TRIGGER; Schema: public; Owner: docker
--

CREATE TRIGGER after_insert_visited_places AFTER INSERT ON public.visited_places FOR EACH ROW EXECUTE FUNCTION public.update_visited_places_count();


--
-- TOC entry 2992 (class 2606 OID 16758)
-- Name: user_cuisine_preferences FK_cuisine; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.user_cuisine_preferences
    ADD CONSTRAINT "FK_cuisine" FOREIGN KEY (cuisine_id) REFERENCES public.cuisine_types(id) NOT VALID;


--
-- TOC entry 2993 (class 2606 OID 16763)
-- Name: user_cuisine_preferences FK_user; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.user_cuisine_preferences
    ADD CONSTRAINT "FK_user" FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 2995 (class 2606 OID 16768)
-- Name: favorite_restaurants favorite_restaurants_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.favorite_restaurants
    ADD CONSTRAINT favorite_restaurants_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- TOC entry 2996 (class 2606 OID 16773)
-- Name: favorite_restaurants favorite_restaurants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.favorite_restaurants
    ADD CONSTRAINT favorite_restaurants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3002 (class 2606 OID 16778)
-- Name: visited_places fk_restaurant; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.visited_places
    ADD CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- TOC entry 3003 (class 2606 OID 16783)
-- Name: visited_places fk_user; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.visited_places
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.profile(id);


--
-- TOC entry 3004 (class 2606 OID 16788)
-- Name: visited_places fks2c5fo1ubc5fun634w0s1yr1j; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.visited_places
    ADD CONSTRAINT fks2c5fo1ubc5fun634w0s1yr1j FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2997 (class 2606 OID 16793)
-- Name: friendships friendships_member1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_member1_id_fkey FOREIGN KEY (member1_id) REFERENCES public.users(id);


--
-- TOC entry 2998 (class 2606 OID 16798)
-- Name: friendships friendships_member2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_member2_id_fkey FOREIGN KEY (member2_id) REFERENCES public.users(id);


--
-- TOC entry 2994 (class 2606 OID 16808)
-- Name: users profile; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT profile FOREIGN KEY (profile_id) REFERENCES public.profile(id) NOT VALID;


--
-- TOC entry 3000 (class 2606 OID 16813)
-- Name: restaurant_cuisines restaurant_cuisines_cuisine_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.restaurant_cuisines
    ADD CONSTRAINT restaurant_cuisines_cuisine_type_id_fkey FOREIGN KEY (cuisine_type_id) REFERENCES public.cuisine_types(id);


--
-- TOC entry 3001 (class 2606 OID 16818)
-- Name: restaurant_cuisines restaurant_cuisines_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.restaurant_cuisines
    ADD CONSTRAINT restaurant_cuisines_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- TOC entry 2999 (class 2606 OID 16823)
-- Name: restaurants restaurants_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- TOC entry 2990 (class 2606 OID 16828)
-- Name: reviews reviews_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- TOC entry 2991 (class 2606 OID 16833)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-05-24 20:22:43 UTC

--
-- PostgreSQL database dump complete
--

