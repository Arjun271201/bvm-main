--
-- PostgreSQL database dump
--


-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

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

--
-- Name: enum_categories_icon; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_categories_icon AS ENUM (
    'play',
    'music',
    'book',
    'cart',
    'download',
    'heart'
);


ALTER TYPE public.enum_categories_icon OWNER TO postgres;

--
-- Name: enum_courses_lessons_video_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_courses_lessons_video_type AS ENUM (
    'youtube',
    'upload'
);


ALTER TYPE public.enum_courses_lessons_video_type OWNER TO postgres;

--
-- Name: enum_donations_donation_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_donations_donation_type AS ENUM (
    'one-time',
    'monthly',
    'special-project'
);


ALTER TYPE public.enum_donations_donation_type OWNER TO postgres;

--
-- Name: enum_donations_payment_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_donations_payment_status AS ENUM (
    'pending',
    'completed',
    'failed'
);


ALTER TYPE public.enum_donations_payment_status OWNER TO postgres;

--
-- Name: enum_donations_special_project; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_donations_special_project AS ENUM (
    'ramanujar-series',
    'sri-caitanyar-series',
    'documentary-projects'
);


ALTER TYPE public.enum_donations_special_project OWNER TO postgres;

--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'pending',
    'paid',
    'failed'
);


ALTER TYPE public.enum_orders_status OWNER TO postgres;

--
-- Name: enum_products_product_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_products_product_type AS ENUM (
    'book',
    'accessory',
    'other'
);


ALTER TYPE public.enum_products_product_type OWNER TO postgres;

--
-- Name: enum_songs_audio_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_songs_audio_type AS ENUM (
    'youtube',
    'upload'
);


ALTER TYPE public.enum_songs_audio_type OWNER TO postgres;

--
-- Name: enum_videos_video_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_videos_video_type AS ENUM (
    'youtube',
    'upload'
);


ALTER TYPE public.enum_videos_video_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.authors_id_seq OWNER TO postgres;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    image_id integer NOT NULL,
    icon public.enum_categories_icon,
    "order" numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: channels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.channels (
    id integer NOT NULL,
    name character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.channels OWNER TO postgres;

--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.channels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.channels_id_seq OWNER TO postgres;

--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    thumbnail_id integer NOT NULL,
    is_paid boolean DEFAULT false,
    price numeric,
    category_id integer,
    featured boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: courses_lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses_lessons (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    lesson_title character varying NOT NULL,
    video_type public.enum_courses_lessons_video_type DEFAULT 'youtube'::public.enum_courses_lessons_video_type,
    youtube_url character varying,
    video_file_id integer,
    duration character varying,
    is_preview boolean DEFAULT false
);


ALTER TABLE public.courses_lessons OWNER TO postgres;

--
-- Name: donations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.donations (
    id integer NOT NULL,
    donation_type public.enum_donations_donation_type NOT NULL,
    special_project public.enum_donations_special_project,
    amount numeric NOT NULL,
    donor_name character varying NOT NULL,
    donor_email character varying NOT NULL,
    donor_phone character varying,
    payment_status public.enum_donations_payment_status DEFAULT 'pending'::public.enum_donations_payment_status,
    transaction_id character varying,
    donation_date timestamp(3) with time zone,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.donations OWNER TO postgres;

--
-- Name: donations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.donations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.donations_id_seq OWNER TO postgres;

--
-- Name: donations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.donations_id_seq OWNED BY public.donations.id;


--
-- Name: homepage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homepage (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone,
    section_headings_explore character varying DEFAULT 'Explore BVM'::character varying,
    section_headings_latest_uploads character varying DEFAULT 'Latest Uploads'::character varying,
    section_headings_featured_songs character varying DEFAULT 'Featured Songs'::character varying,
    section_headings_featured_books character varying DEFAULT 'Featured Books'::character varying,
    section_headings_courses character varying DEFAULT 'Courses'::character varying,
    section_headings_testimonials character varying DEFAULT 'Testimonial'::character varying,
    section_headings_support_b_v_m character varying DEFAULT 'Support BVM'::character varying
);


ALTER TABLE public.homepage OWNER TO postgres;

--
-- Name: homepage_hero_slides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homepage_hero_slides (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    eyebrow character varying DEFAULT 'WELCOME TO BHAKTI VEDANTA MEDIA'::character varying,
    heading character varying NOT NULL,
    subtext character varying,
    cta_label character varying DEFAULT 'Watch Now'::character varying,
    cta_link character varying DEFAULT '/videos'::character varying,
    background_image_id integer NOT NULL
);


ALTER TABLE public.homepage_hero_slides OWNER TO postgres;

--
-- Name: homepage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.homepage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.homepage_id_seq OWNER TO postgres;

--
-- Name: homepage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.homepage_id_seq OWNED BY public.homepage.id;


--
-- Name: homepage_video_filters_category_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homepage_video_filters_category_options (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL
);


ALTER TABLE public.homepage_video_filters_category_options OWNER TO postgres;

--
-- Name: homepage_video_filters_channel_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homepage_video_filters_channel_options (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL
);


ALTER TABLE public.homepage_video_filters_channel_options OWNER TO postgres;

--
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    image_id integer NOT NULL,
    "order" numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.languages_id_seq OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_id_seq OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    items jsonb,
    total numeric NOT NULL,
    customer_name character varying NOT NULL,
    customer_email character varying NOT NULL,
    customer_phone character varying,
    shipping_address character varying,
    razorpay_order_id character varying,
    razorpay_payment_id character varying,
    status public.enum_orders_status DEFAULT 'pending'::public.enum_orders_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


ALTER TABLE public.payload_kv OWNER TO postgres;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_kv_id_seq OWNER TO postgres;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    categories_id integer,
    videos_id integer,
    songs_id integer,
    courses_id integer,
    products_id integer,
    donations_id integer,
    testimonials_id integer,
    orders_id integer,
    languages_id integer,
    channels_id integer,
    video_categories_id integer,
    authors_id integer
);


ALTER TABLE public.payload_locked_documents_rels OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNER TO postgres;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_migrations_id_seq OWNER TO postgres;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNER TO postgres;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    price numeric NOT NULL,
    compare_price numeric,
    stock numeric DEFAULT 0,
    category_id integer,
    product_type public.enum_products_product_type DEFAULT 'book'::public.enum_products_product_type,
    featured boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.products_images OWNER TO postgres;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    title character varying NOT NULL,
    artist character varying,
    cover_image_id integer NOT NULL,
    audio_type public.enum_songs_audio_type DEFAULT 'youtube'::public.enum_songs_audio_type NOT NULL,
    youtube_url character varying,
    audio_file_id integer,
    category_id integer,
    duration character varying,
    featured boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    language_category_id integer,
    author_id integer,
    is_regular boolean DEFAULT false,
    is_mantra boolean DEFAULT false,
    is_sloka boolean DEFAULT false
);


ALTER TABLE public.songs OWNER TO postgres;

--
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.songs_id_seq OWNER TO postgres;

--
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    name character varying NOT NULL,
    location character varying,
    photo_id integer,
    message character varying NOT NULL,
    rating numeric DEFAULT 5,
    featured boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO postgres;

--
-- Name: video_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.video_categories OWNER TO postgres;

--
-- Name: video_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.video_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.video_categories_id_seq OWNER TO postgres;

--
-- Name: video_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.video_categories_id_seq OWNED BY public.video_categories.id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    thumbnail_id integer NOT NULL,
    video_type public.enum_videos_video_type DEFAULT 'youtube'::public.enum_videos_video_type NOT NULL,
    youtube_url character varying,
    video_file_id integer,
    duration character varying,
    featured boolean DEFAULT false,
    published_date timestamp(3) with time zone,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    language_category_id integer,
    channel_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.videos_id_seq OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: donations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations ALTER COLUMN id SET DEFAULT nextval('public.donations_id_seq'::regclass);


--
-- Name: homepage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage ALTER COLUMN id SET DEFAULT nextval('public.homepage_id_seq'::regclass);


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: video_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_categories ALTER COLUMN id SET DEFAULT nextval('public.video_categories_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (1, 'Veda Vyasa (Vedavyasa)', 'Veda Vyasa (Vedavyasa)', '2026-09-01 11:05:14.247+05:30', '2026-09-01 11:05:14.247+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (2, 'Jayadeva', 'Jayadeva', '2026-09-01 11:40:04.321+05:30', '2026-09-01 11:40:04.321+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (3, 'Surdas', 'Surdas', '2026-09-01 11:40:16.998+05:30', '2026-09-01 11:40:16.998+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (4, 'Vallabhacharya', 'Vallabhacharya', '2026-09-01 11:40:29.865+05:30', '2026-09-01 11:40:29.865+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (5, 'Chaitanya Mahaprabhu', 'Chaitanya Mahaprabhu', '2026-09-01 11:40:43.848+05:30', '2026-09-01 11:40:43.848+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (6, 'Mirabai (Meera Bai)', 'Mirabai (Meera Bai)', '2026-09-01 11:41:56.817+05:30', '2026-09-01 11:41:56.816+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (7, 'Annamacharya', 'Annamacharya', '2026-09-01 11:42:23.662+05:30', '2026-09-01 11:42:23.662+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (8, 'Bilvamangala Thakura (Leelasuka)', 'Bilvamangala Thakura (Leelasuka)', '2026-09-01 11:42:37.125+05:30', '2026-09-01 11:42:37.125+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (9, 'Bammera Potana', 'Bammera Potana', '2026-09-01 11:42:59.932+05:30', '2026-09-01 11:42:59.932+05:30');
INSERT INTO public.authors (id, name, slug, updated_at, created_at) VALUES (10, 'Krishnadasa Kaviraja', 'Krishnadasa Kaviraja', '2026-09-01 11:43:14.985+05:30', '2026-09-01 11:43:14.985+05:30');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, title, slug, image_id, icon, "order", updated_at, created_at) VALUES (6, 'Donations ', 'Donations', 55, 'heart', 6, '2026-08-27 12:09:35.847+05:30', '2026-08-20 15:15:24.29+05:30');
INSERT INTO public.categories (id, title, slug, image_id, icon, "order", updated_at, created_at) VALUES (5, 'Downloads', 'Downloads', 56, 'download', 5, '2026-08-27 12:09:58.805+05:30', '2026-08-20 15:12:36.754+05:30');
INSERT INTO public.categories (id, title, slug, image_id, icon, "order", updated_at, created_at) VALUES (2, 'Songs', 'First-Song', 59, 'music', 2, '2026-08-27 12:11:21.618+05:30', '2026-08-20 15:05:12.312+05:30');
INSERT INTO public.categories (id, title, slug, image_id, icon, "order", updated_at, created_at) VALUES (3, 'Courses', 'Books', 58, 'book', 4, '2026-08-27 15:44:57.15+05:30', '2026-08-20 15:07:37.195+05:30');
INSERT INTO public.categories (id, title, slug, image_id, icon, "order", updated_at, created_at) VALUES (4, 'Store', 'Book-Stores', 57, 'cart', 4, '2026-08-27 15:45:39.136+05:30', '2026-08-20 15:10:05.209+05:30');
INSERT INTO public.categories (id, title, slug, image_id, icon, "order", updated_at, created_at) VALUES (7, 'Videos', 'first-uploads', 86, 'play', 1, '2026-08-31 10:48:10.745+05:30', '2026-08-31 10:48:10.744+05:30');


--
-- Data for Name: channels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.channels (id, name, updated_at, created_at) VALUES (1, 'BV Darishanam', '2026-08-31 14:42:13.903+05:30', '2026-08-31 14:42:13.903+05:30');
INSERT INTO public.channels (id, name, updated_at, created_at) VALUES (2, 'Krishna''s Stories', '2026-08-31 15:00:56.24+05:30', '2026-08-31 15:00:56.24+05:30');
INSERT INTO public.channels (id, name, updated_at, created_at) VALUES (3, 'Srila Prabhupada Lectures', '2026-08-31 15:19:36.379+05:30', '2026-08-31 15:19:36.379+05:30');
INSERT INTO public.channels (id, name, updated_at, created_at) VALUES (4, 'BVM Devotional Music', '2026-08-31 15:19:46.959+05:30', '2026-08-31 15:19:46.959+05:30');
INSERT INTO public.channels (id, name, updated_at, created_at) VALUES (5, 'BVM Main Channel', '2026-08-31 15:19:56.935+05:30', '2026-08-31 15:19:56.935+05:30');
INSERT INTO public.channels (id, name, updated_at, created_at) VALUES (6, 'BVM Kids Channel', '2026-08-31 15:20:08.044+05:30', '2026-08-31 15:20:08.044+05:30');


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.courses (id, title, description, thumbnail_id, is_paid, price, category_id, featured, updated_at, created_at) VALUES (1, 'Bhagavad-Gita - Verse by verse', 'Bhagavad-Gita - Verse by verse', 11, false, NULL, 3, true, '2026-08-21 10:41:06.522+05:30', '2026-08-21 10:41:06.52+05:30');
INSERT INTO public.courses (id, title, description, thumbnail_id, is_paid, price, category_id, featured, updated_at, created_at) VALUES (2, 'Foundation of Bhakthi Yoga', 'Foundation of Bhakthi Yoga', 12, false, NULL, 3, true, '2026-08-21 10:44:50.631+05:30', '2026-08-21 10:44:50.63+05:30');
INSERT INTO public.courses (id, title, description, thumbnail_id, is_paid, price, category_id, featured, updated_at, created_at) VALUES (3, 'Srimad-Bhagavatham -Journey Through the Bhagavatham', 'Srimad-Bhagavatham -Journey Through the Bhagavatham', 13, true, 500, 3, true, '2026-08-21 10:48:42.572+05:30', '2026-08-21 10:48:42.571+05:30');
INSERT INTO public.courses (id, title, description, thumbnail_id, is_paid, price, category_id, featured, updated_at, created_at) VALUES (4, 'Introduction of Krishna Consciousness', 'Introduction of Krishna Consciousness', 14, false, NULL, 3, false, '2026-08-21 10:51:17.55+05:30', '2026-08-21 10:51:17.55+05:30');
INSERT INTO public.courses (id, title, description, thumbnail_id, is_paid, price, category_id, featured, updated_at, created_at) VALUES (5, 'Krishna-Balaram''s Stroy', 'Krishna and Balarama were brothers, born to Devaki and Vasudeva.
They grew up in Gokul, where they spent their childhood protecting people from evil.
Together, they defeated the wicked King Kamsa and brought peace to Mathura.
Krishna became known for his wisdom and divine love, while Balarama was famous for his strength and courage.
', 53, true, 200, 2, true, '2026-08-26 12:03:15.781+05:30', '2026-08-26 12:03:15.78+05:30');


--
-- Data for Name: courses_lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (1, 1, '6a87dda3f6a4c2ee0e7fe8af', 'Course-1 Bhagavad-gita.', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (2, 1, '6a87ddc2f6a4c2ee0e7fe8b1', 'Course-1 Bhagavad-gita.', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (1, 2, '6a87dea2f6a4c2ee0e7fe8b3', 'Foundation of Bhakthi Yoga', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (1, 3, '6a87df8ff6a4c2ee0e7fe8b5', 'Srimad-Bhagavatham -Journey Through the Bhagavatham.jpg', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (2, 3, '6a87df95f6a4c2ee0e7fe8b7', 'Srimad-Bhagavatham -Journey Through the Bhagavatham.jpg', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (1, 4, '6a87dfd5f6a4c2ee0e7fe8b9', 'Introduction of Krishna Consciousness', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (2, 4, '6a87dfd9f6a4c2ee0e7fe8bb', 'Introduction of Krishna Consciousness', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (3, 4, '6a87dfddf6a4c2ee0e7fe8bd', 'Introduction of Krishna Consciousness', 'youtube', NULL, NULL, NULL, false);
INSERT INTO public.courses_lessons (_order, _parent_id, id, lesson_title, video_type, youtube_url, video_file_id, duration, is_preview) VALUES (1, 5, '6a8e888819a283dbb513a328', 'Foundation of Bhakthi Yoga', 'youtube', '/', NULL, '4.00', true);


--
-- Data for Name: donations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: homepage; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.homepage (id, updated_at, created_at, section_headings_explore, section_headings_latest_uploads, section_headings_featured_songs, section_headings_featured_books, section_headings_courses, section_headings_testimonials, section_headings_support_b_v_m) VALUES (1, '2026-08-29 12:39:51.002+05:30', '2026-08-21 13:04:21.774+05:30', 'Explore BVM', 'Featured Videos', 'Featured Songs', 'Featured Books', 'Courses', 'Testimonial', 'Support BVM');


--
-- Data for Name: homepage_hero_slides; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.homepage_hero_slides (_order, _parent_id, id, eyebrow, heading, subtext, cta_label, cta_link, background_image_id) VALUES (1, 1, '6a87ff02c15ee17c01d8ca44', 'WELCOME TO BHAKTI VEDANTA MEDIA', 'Discover Timeless Wisdom Through Devotional Media', 'Explore a growing collection of devotional videos, inspiring songs, spiritual courses, books, and free resources designed to deepen your Krishna consciousness and enrich your daily spiritual journey.', 'Watch Now', '/videos', 27);
INSERT INTO public.homepage_hero_slides (_order, _parent_id, id, eyebrow, heading, subtext, cta_label, cta_link, background_image_id) VALUES (2, 1, '6a9008b0ee54a53cb7f3aa5e', 'WELCOME TO BHAKTI VEDANTA MEDIA', 'Discover Timeless Wisdom Through Devotional Media', 'Explore a growing collection of devotional videos, inspiring songs, spiritual courses, books, and free resources designed to deepen your Krishna consciousness and enrich your daily spiritual journey.', 'Watch Now', '/videos', 79);
INSERT INTO public.homepage_hero_slides (_order, _parent_id, id, eyebrow, heading, subtext, cta_label, cta_link, background_image_id) VALUES (3, 1, '6a90148fee54a53cb7f3aa60', 'WELCOME TO BHAKTI VEDANTA MEDIA', 'WELCOME TO BHAKTI VEDANTA MEDIA', 'WELCOME TO BHAKTI VEDANTA MEDIA', 'Watch Now', '/videos', 80);


--
-- Data for Name: homepage_video_filters_category_options; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: homepage_video_filters_channel_options; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.languages (id, title, slug, image_id, "order", updated_at, created_at) VALUES (1, 'Tamil', 'First-video', 61, 1, '2026-08-27 12:49:50.542+05:30', '2026-08-27 12:49:50.542+05:30');
INSERT INTO public.languages (id, title, slug, image_id, "order", updated_at, created_at) VALUES (2, 'English', 'first-Upload', 88, 2, '2026-08-31 12:34:34.251+05:30', '2026-08-27 12:58:40.072+05:30');
INSERT INTO public.languages (id, title, slug, image_id, "order", updated_at, created_at) VALUES (3, 'Hindi', 'first-blog', 89, 3, '2026-08-31 12:36:07.047+05:30', '2026-08-27 13:00:31.379+05:30');
INSERT INTO public.languages (id, title, slug, image_id, "order", updated_at, created_at) VALUES (5, 'Telugu', 'first-upload', 90, 4, '2026-08-31 12:36:52.221+05:30', '2026-08-27 13:01:25.953+05:30');
INSERT INTO public.languages (id, title, slug, image_id, "order", updated_at, created_at) VALUES (8, 'Malayalam', 'first-uploads', 92, 5, '2026-08-31 12:37:52.124+05:30', '2026-08-27 16:17:48.447+05:30');


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (1, 'ISKCON', '2026-08-20 11:19:36.798+05:30', '2026-08-20 11:19:36.769+05:30', '/api/media/file/ISKCON-Banner.jpeg', NULL, 'ISKCON-Banner.jpeg', 'image/jpeg', 135772, 900, 600, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (4, 'Hatta', '2026-08-20 15:07:32.253+05:30', '2026-08-20 15:07:32.253+05:30', '/api/media/file/Nama-Hatta-img.jpg', NULL, 'Nama-Hatta-img.jpg', 'image/jpeg', 500195, 1902, 1500, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (5, 'Bhakti-Kids', '2026-08-20 15:09:58.618+05:30', '2026-08-20 15:09:58.618+05:30', '/api/media/file/Bhakti-Kids-img.jpg', NULL, 'Bhakti-Kids-img.jpg', 'image/jpeg', 37966, 1000, 575, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (6, 'Bhakti-Kids-img2.jpg', '2026-08-20 15:12:24.218+05:30', '2026-08-20 15:12:24.217+05:30', '/api/media/file/Bhakti-Kids-img2.jpg', NULL, 'Bhakti-Kids-img2.jpg', 'image/jpeg', 99103, 635, 483, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (7, 'Bhakti-Homes-img.jpg', '2026-08-20 15:15:08.447+05:30', '2026-08-20 15:15:08.447+05:30', '/api/media/file/Bhakti-Homes-img.jpg', NULL, 'Bhakti-Homes-img.jpg', 'image/jpeg', 711726, 1920, 1199, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (8, 'Global', '2026-08-20 15:35:18.338+05:30', '2026-08-20 15:35:18.338+05:30', '/api/media/file/Global-Congregation.jpg', NULL, 'Global-Congregation.jpg', 'image/jpeg', 41091, 590, 412, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (9, 'Hatta', '2026-08-20 15:41:34.239+05:30', '2026-08-20 15:41:34.239+05:30', '/api/media/file/Nama-Hatta-img-1.jpg', NULL, 'Nama-Hatta-img-1.jpg', 'image/jpeg', 500195, 1902, 1500, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (10, 'Banner', '2026-08-20 15:50:28.148+05:30', '2026-08-20 15:50:28.148+05:30', '/api/media/file/Banner-Img.png', NULL, 'Banner-Img.png', 'image/png', 2652802, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (11, 'Course-1 Bhagavad-gita', '2026-08-21 10:39:49.286+05:30', '2026-08-21 10:39:49.286+05:30', '/api/media/file/Course-1%20Bhagavad-gita.jpg', NULL, 'Course-1 Bhagavad-gita.jpg', 'image/jpeg', 77279, 736, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (12, 'Foundation of Bhakthi yoga.jpg', '2026-08-21 10:44:06.534+05:30', '2026-08-21 10:44:06.534+05:30', '/api/media/file/Foundation%20of%20Bhakthi%20yoga.jpg', NULL, 'Foundation of Bhakthi yoga.jpg', 'image/jpeg', 50902, 736, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (13, 'Srimad-Bhagavatham -Journey Through the Bhagavatham.jpg', '2026-08-21 10:47:53.533+05:30', '2026-08-21 10:47:53.533+05:30', '/api/media/file/Srimad-Bhagavatham%20-Journey%20Through%20the%20Bhagavatham.jpg', NULL, 'Srimad-Bhagavatham -Journey Through the Bhagavatham.jpg', 'image/jpeg', 67160, 735, 412, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (14, 'Introduction of Krishna Consciousness.jpg', '2026-08-21 10:51:15.928+05:30', '2026-08-21 10:51:15.927+05:30', '/api/media/file/Introduction%20of%20Krishna%20Consciousness.jpg', NULL, 'Introduction of Krishna Consciousness.jpg', 'image/jpeg', 75897, 736, 736, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (15, 'Shrimad Bhagavad Gita.jpg', '2026-08-21 10:58:18.963+05:30', '2026-08-21 10:58:18.962+05:30', '/api/media/file/Shrimad%20Bhagavad%20Gita.jpg', NULL, 'Shrimad Bhagavad Gita.jpg', 'image/jpeg', 143358, 736, 1104, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (16, 'Bhagavad Gita As it Is.jpg', '2026-08-21 11:00:58.409+05:30', '2026-08-21 11:00:58.408+05:30', '/api/media/file/Bhagavad%20Gita%20As%20it%20Is.jpg', NULL, 'Bhagavad Gita As it Is.jpg', 'image/jpeg', 163804, 736, 1308, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (17, 'Radha-Krishna', '2026-08-21 11:02:16.158+05:30', '2026-08-21 11:02:16.158+05:30', '/api/media/file/Radha-Krishna.jpg', NULL, 'Radha-Krishna.jpg', 'image/jpeg', 138252, 736, 903, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (18, 'Introduction of Krishna Consciousness.jpg', '2026-08-21 11:04:10.293+05:30', '2026-08-21 11:04:10.293+05:30', '/api/media/file/Introduction%20of%20Krishna%20Consciousness-1.jpg', NULL, 'Introduction of Krishna Consciousness-1.jpg', 'image/jpeg', 75897, 736, 736, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (19, 'BHAGAVAD GITA.jpg', '2026-08-21 11:05:49.329+05:30', '2026-08-21 11:05:49.329+05:30', '/api/media/file/BHAGAVAD%20GITA.jpg', NULL, 'BHAGAVAD GITA.jpg', 'image/jpeg', 94527, 735, 761, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (20, 'Shrimad Bhagavad Gita.jpg', '2026-08-21 11:07:13.293+05:30', '2026-08-21 11:07:13.293+05:30', '/api/media/file/Shrimad%20Bhagavad%20Gita-1.jpg', NULL, 'Shrimad Bhagavad Gita-1.jpg', 'image/jpeg', 143358, 736, 1104, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (21, 'download (26).jpg', '2026-08-21 11:08:29.518+05:30', '2026-08-21 11:08:29.518+05:30', '/api/media/file/download%20(26).jpg', NULL, 'download (26).jpg', 'image/jpeg', 215855, 736, 1308, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (22, 'Tharun S.jpg', '2026-08-21 12:16:14.173+05:30', '2026-08-21 12:16:14.173+05:30', '/api/media/file/Tharun%20S.jpg', NULL, 'Tharun S.jpg', 'image/jpeg', 107774, 736, 980, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (23, 'Tharun S.jpg', '2026-08-21 12:17:44.244+05:30', '2026-08-21 12:17:44.243+05:30', '/api/media/file/Tharun%20S-1.jpg', NULL, 'Tharun S-1.jpg', 'image/jpeg', 107774, 736, 980, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (24, 'Aswini.jpg', '2026-08-21 12:19:30.521+05:30', '2026-08-21 12:19:30.521+05:30', '/api/media/file/Aswini.jpg', NULL, 'Aswini.jpg', 'image/jpeg', 84425, 736, 920, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (25, 'Abisheik R.jpg', '2026-08-21 12:21:05.216+05:30', '2026-08-21 12:21:05.215+05:30', '/api/media/file/Abisheik%20R.jpg', NULL, 'Abisheik R.jpg', 'image/jpeg', 118077, 736, 1288, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (26, 'Saravanan P.jpg', '2026-08-21 12:23:06.948+05:30', '2026-08-21 12:23:06.948+05:30', '/api/media/file/Saravanan%20P.jpg', NULL, 'Saravanan P.jpg', 'image/jpeg', 69548, 564, 998, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (27, 'Banner-Img.png', '2026-08-21 13:03:36.832+05:30', '2026-08-21 13:03:36.832+05:30', '/api/media/file/Banner-Img-1.png', NULL, 'Banner-Img-1.png', 'image/png', 2652802, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (2, 'video.png', '2026-08-21 14:52:06.798+05:30', '2026-08-20 15:01:34.901+05:30', '/api/media/file/video.png', NULL, 'video.png', 'image/png', 143714, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (3, 'song.png', '2026-08-21 14:52:39.269+05:30', '2026-08-20 15:05:09.939+05:30', '/api/media/file/song.png', NULL, 'song.png', 'image/png', 171304, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (28, 'course.png', '2026-08-21 14:53:14.977+05:30', '2026-08-21 14:53:14.976+05:30', '/api/media/file/course.png', NULL, 'course.png', 'image/png', 160158, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (29, 'store.png', '2026-08-21 14:53:48.618+05:30', '2026-08-21 14:53:48.618+05:30', '/api/media/file/store.png', NULL, 'store.png', 'image/png', 164384, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (30, 'Downloads.png', '2026-08-21 14:55:32.611+05:30', '2026-08-21 14:55:32.611+05:30', '/api/media/file/Downloads.png', NULL, 'Downloads.png', 'image/png', 1499059, 2624, 1744, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (31, 'Hare Krishna.jpg', '2026-08-21 15:00:20.85+05:30', '2026-08-21 14:59:40.95+05:30', '/api/media/file/Hare%20Krishna.jpg', NULL, 'Hare Krishna.jpg', 'image/jpeg', 168045, 736, 1050, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (32, 'download (10).jpg', '2026-08-21 15:02:21.044+05:30', '2026-08-21 15:01:22.918+05:30', '/api/media/file/download%20(10).jpg', NULL, 'download (10).jpg', 'image/jpeg', 153841, 736, 859, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (33, 'download (11).jpg', '2026-08-21 15:03:23.965+05:30', '2026-08-21 15:03:23.965+05:30', '/api/media/file/download%20(11).jpg', NULL, 'download (11).jpg', 'image/jpeg', 147522, 736, 948, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (34, 'download (12).jpg', '2026-08-21 15:05:32.776+05:30', '2026-08-21 15:05:17.699+05:30', '/api/media/file/download%20(12).jpg', NULL, 'download (12).jpg', 'image/jpeg', 110649, 736, 653, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (35, 'Hare Krishna.jpg', '2026-08-21 15:06:39.782+05:30', '2026-08-21 15:06:39.782+05:30', '/api/media/file/Hare%20Krishna-1.jpg', NULL, 'Hare Krishna-1.jpg', 'image/jpeg', 162072, 736, 997, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (36, 'download (10).jpg', '2026-08-21 15:08:11.492+05:30', '2026-08-21 15:07:48.762+05:30', '/api/media/file/download%20(10)-1.jpg', NULL, 'download (10)-1.jpg', 'image/jpeg', 118668, 736, 638, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (37, 'download (11).jpg', '2026-08-21 15:10:15.846+05:30', '2026-08-21 15:10:15.846+05:30', '/api/media/file/download%20(11)-1.jpg', NULL, 'download (11)-1.jpg', 'image/jpeg', 139032, 736, 912, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (38, 'Hare Krishna.jpg', '2026-08-21 15:14:26.461+05:30', '2026-08-21 15:13:51.838+05:30', '/api/media/file/Hare%20Krishna-2.jpg', NULL, 'Hare Krishna-2.jpg', 'image/jpeg', 155425, 736, 874, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (39, 'download (12).jpg', '2026-08-21 15:15:18.559+05:30', '2026-08-21 15:15:18.559+05:30', '/api/media/file/download%20(12)-1.jpg', NULL, 'download (12)-1.jpg', 'image/jpeg', 128508, 736, 764, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (40, 'Hare Krishna.jpg', '2026-08-21 15:18:21.164+05:30', '2026-08-21 15:18:21.164+05:30', '/api/media/file/Hare%20Krishna-3.jpg', NULL, 'Hare Krishna-3.jpg', 'image/jpeg', 162794, 736, 1003, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (41, 'download (11).jpg', '2026-08-21 15:19:08.512+05:30', '2026-08-21 15:18:58.213+05:30', '/api/media/file/download%20(11)-2.jpg', NULL, 'download (11)-2.jpg', 'image/jpeg', 150677, 736, 964, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (42, 'download (12).jpg', '2026-08-21 15:19:47.998+05:30', '2026-08-21 15:19:47.997+05:30', '/api/media/file/download%20(12)-2.jpg', NULL, 'download (12)-2.jpg', 'image/jpeg', 140886, 736, 851, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (43, 'Radhakrishna.jpg', '2026-08-22 12:23:55.058+05:30', '2026-08-22 12:23:55.058+05:30', '/api/media/file/Radhakrishna.jpg', NULL, 'Radhakrishna.jpg', 'image/jpeg', 288447, 736, 1106, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (44, 'radhakrishna.mp3', '2026-08-22 12:27:37.196+05:30', '2026-08-22 12:27:37.195+05:30', '/api/media/file/radhakrishna.mp3', NULL, 'radhakrishna.mp3', 'audio/mpeg', 381028, NULL, NULL, NULL, NULL);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (45, 'download (30).jpg', '2026-08-22 12:30:25.329+05:30', '2026-08-22 12:30:25.329+05:30', '/api/media/file/download%20(30).jpg', NULL, 'download (30).jpg', 'image/jpeg', 82282, 535, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (46, 'download (19).jpg', '2026-08-22 12:31:34.262+05:30', '2026-08-22 12:31:34.262+05:30', '/api/media/file/download%20(19).jpg', NULL, 'download (19).jpg', 'image/jpeg', 90706, 736, 939, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (47, 'download (21).jpg', '2026-08-22 12:33:16.253+05:30', '2026-08-22 12:33:16.253+05:30', '/api/media/file/download%20(21).jpg', NULL, 'download (21).jpg', 'image/jpeg', 161654, 736, 963, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (48, 'Foundation of Bhakthi yoga.jpg', '2026-08-22 12:46:16.86+05:30', '2026-08-22 12:46:16.86+05:30', '/api/media/file/Foundation%20of%20Bhakthi%20yoga-1.jpg', NULL, 'Foundation of Bhakthi yoga-1.jpg', 'image/jpeg', 50902, 736, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (49, 'download (30).jpg', '2026-08-22 12:49:24.971+05:30', '2026-08-22 12:49:24.971+05:30', '/api/media/file/download%20(30)-1.jpg', NULL, 'download (30)-1.jpg', 'image/jpeg', 113078, 736, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (50, 'Bhakti-Kids-img2.jpg', '2026-08-25 15:06:09.356+05:30', '2026-08-25 15:06:09.355+05:30', '/api/media/file/Bhakti-Kids-img2-1.jpg', NULL, 'Bhakti-Kids-img2-1.jpg', 'image/jpeg', 99103, 635, 483, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (51, 'The Spirit of Bhakti', '2026-08-26 11:56:33.651+05:30', '2026-08-26 11:56:33.651+05:30', '/api/media/file/Bhakti-Vriksha-img.jpg', NULL, 'Bhakti-Vriksha-img.jpg', 'image/jpeg', 115289, 705, 506, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (52, 'radhakrishna', '2026-08-26 11:57:44.386+05:30', '2026-08-26 11:57:44.386+05:30', '/api/media/file/radhakrishna-1.mp3', NULL, 'radhakrishna-1.mp3', 'audio/mpeg', 381028, NULL, NULL, NULL, NULL);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (53, 'Krishna & Balaram', '2026-08-26 12:03:55.55+05:30', '2026-08-26 12:02:14.275+05:30', '/api/media/file/Krishna%20%26%20Balaram.png', NULL, 'Krishna & Balaram.png', 'image/png', 3803451, 1402, 989, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (54, 'Krishna & Balaram', '2026-08-27 11:35:58.281+05:30', '2026-08-27 11:35:58.278+05:30', '/api/media/file/Krishna%20%26%20Balaram-1.png', NULL, 'Krishna & Balaram-1.png', 'image/png', 3238882, 1402, 847, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (55, 'Donations', '2026-08-27 12:09:32.589+05:30', '2026-08-27 12:09:32.589+05:30', '/api/media/file/Donations.png', NULL, 'Donations.png', 'image/png', 121037, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (56, 'Downloads', '2026-08-27 12:09:57.188+05:30', '2026-08-27 12:09:57.187+05:30', '/api/media/file/Downloads-1.png', NULL, 'Downloads-1.png', 'image/png', 161190, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (57, 'Book-Store', '2026-08-27 12:10:18.973+05:30', '2026-08-27 12:10:18.972+05:30', '/api/media/file/Book-Store.png', NULL, 'Book-Store.png', 'image/png', 177797, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (58, 'Devotional-books', '2026-08-27 12:10:53.629+05:30', '2026-08-27 12:10:53.629+05:30', '/api/media/file/Devotional-books.png', NULL, 'Devotional-books.png', 'image/png', 159234, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (59, 'songs', '2026-08-27 12:11:20.015+05:30', '2026-08-27 12:11:20.015+05:30', '/api/media/file/songs.png', NULL, 'songs.png', 'image/png', 170153, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (60, 'videos', '2026-08-27 12:11:43.012+05:30', '2026-08-27 12:11:43.011+05:30', '/api/media/file/videos.png', NULL, 'videos.png', 'image/png', 152498, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (61, 'Tamil-Category', '2026-08-27 12:49:44.204+05:30', '2026-08-27 12:49:44.204+05:30', '/api/media/file/Tamil-Category.jpg', NULL, 'Tamil-Category.jpg', 'image/jpeg', 8483, 620, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (62, 'English-category.png', '2026-08-27 12:58:34.218+05:30', '2026-08-27 12:58:34.208+05:30', '/api/media/file/English-category.png', NULL, 'English-category.png', 'image/png', 9200, 678, 337, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (63, 'Hindi-category.png', '2026-08-27 13:00:28.239+05:30', '2026-08-27 13:00:28.239+05:30', '/api/media/file/Hindi-category.png', NULL, 'Hindi-category.png', 'image/png', 5230, 816, 288, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (64, 'Telugu-category.png', '2026-08-27 13:01:08.707+05:30', '2026-08-27 13:01:08.707+05:30', '/api/media/file/Telugu-category.png', NULL, 'Telugu-category.png', 'image/png', 8878, 813, 320, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (65, 'Hare Krishna.jpg', '2026-08-27 13:06:57.394+05:30', '2026-08-27 13:06:57.394+05:30', '/api/media/file/Hare%20Krishna-4.jpg', NULL, 'Hare Krishna-4.jpg', 'image/jpeg', 189640, 736, 1307, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (66, 'download (10).jpg', '2026-08-27 13:10:51.148+05:30', '2026-08-27 13:10:51.148+05:30', '/api/media/file/download%20(10)-2.jpg', NULL, 'download (10)-2.jpg', 'image/jpeg', 183194, 736, 1104, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (67, 'download (11).jpg', '2026-08-27 13:15:28.495+05:30', '2026-08-27 13:15:28.495+05:30', '/api/media/file/download%20(11)-3.jpg', NULL, 'download (11)-3.jpg', 'image/jpeg', 223006, 736, 1307, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (68, 'download (12).jpg', '2026-08-27 13:18:38.777+05:30', '2026-08-27 13:18:38.777+05:30', '/api/media/file/download%20(12)-3.jpg', NULL, 'download (12)-3.jpg', 'image/jpeg', 170569, 736, 1212, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (69, 'Hare Krishna.jpg', '2026-08-27 13:28:46.328+05:30', '2026-08-27 13:28:46.328+05:30', '/api/media/file/Hare%20Krishna-5.jpg', NULL, 'Hare Krishna-5.jpg', 'image/jpeg', 189640, 736, 1307, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (70, 'Hare Krishna.jpg', '2026-08-27 13:29:39.815+05:30', '2026-08-27 13:29:39.814+05:30', '/api/media/file/Hare%20Krishna-6.jpg', NULL, 'Hare Krishna-6.jpg', 'image/jpeg', 189640, 736, 1307, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (71, 'Hare Krishna.jpg', '2026-08-27 13:30:25.718+05:30', '2026-08-27 13:30:25.718+05:30', '/api/media/file/Hare%20Krishna-7.jpg', NULL, 'Hare Krishna-7.jpg', 'image/jpeg', 189640, 736, 1307, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (72, 'Hare Krishna.jpg', '2026-08-27 13:31:23.911+05:30', '2026-08-27 13:31:23.911+05:30', '/api/media/file/Hare%20Krishna-8.jpg', NULL, 'Hare Krishna-8.jpg', 'image/jpeg', 189640, 736, 1307, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (73, 'Hare Krishna.jpg', '2026-08-27 13:32:26.057+05:30', '2026-08-27 13:32:26.057+05:30', '/api/media/file/Hare%20Krishna-9.jpg', NULL, 'Hare Krishna-9.jpg', 'image/jpeg', 189640, 736, 1307, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (74, 'Shree Krishna.jpg', '2026-08-27 15:22:34.43+05:30', '2026-08-27 15:22:34.43+05:30', '/api/media/file/Shree%20Krishna.jpg', NULL, 'Shree Krishna.jpg', 'image/jpeg', 71917, 736, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (75, 'Shri Krishna Bhagwan 4K Wallpaper.jpg', '2026-08-27 16:13:31.532+05:30', '2026-08-27 16:13:31.531+05:30', '/api/media/file/Shri%20Krishna%20Bhagwan%204K%20Wallpaper.jpg', NULL, 'Shri Krishna Bhagwan 4K Wallpaper.jpg', 'image/jpeg', 59635, 736, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (76, 'Telugu-category.png', '2026-08-27 16:16:02.629+05:30', '2026-08-27 16:16:02.629+05:30', '/api/media/file/Telugu-category-1.png', NULL, 'Telugu-category-1.png', 'image/png', 9775, 813, 385, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (77, 'Tamil-Category.gif', '2026-08-27 16:17:19.709+05:30', '2026-08-27 16:17:19.708+05:30', '/api/media/file/Tamil-Category-1.jpg', NULL, 'Tamil-Category-1.jpg', 'image/jpeg', 8483, 620, 414, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (78, 'BVM-2nd- Banner', '2026-08-29 12:13:04.73+05:30', '2026-08-29 12:13:04.73+05:30', '/api/media/file/BVM-2nd-%20Banner.png', NULL, 'BVM-2nd- Banner.png', 'image/png', 2011296, 1584, 672, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (79, '2nd-Banner-BVM', '2026-08-29 12:14:58.309+05:30', '2026-08-29 12:14:58.309+05:30', '/api/media/file/2nd-Banner-BVM.png', NULL, '2nd-Banner-BVM.png', 'image/png', 1922485, 1584, 672, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (80, '3rd-Banner-BVM', '2026-08-29 12:18:25.322+05:30', '2026-08-29 12:18:25.322+05:30', '/api/media/file/3rd-Banner-BVM.png', NULL, '3rd-Banner-BVM.png', 'image/png', 2188250, 1584, 672, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (81, 'Krishna & Balaram', '2026-08-31 10:11:37.472+05:30', '2026-08-31 10:11:37.461+05:30', '/api/media/file/Krishna%20%26%20Balaram-2.png', NULL, 'Krishna & Balaram-2.png', 'image/png', 3586176, 1402, 935, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (82, 'Krishna & Balaram', '2026-08-31 10:17:26.444+05:30', '2026-08-31 10:17:26.439+05:30', '/api/media/file/Krishna%20%26%20Balaram-3.png', NULL, 'Krishna & Balaram-3.png', 'image/png', 3671048, 1402, 956, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (83, 'Radha & Krishna', '2026-08-31 10:27:01.518+05:30', '2026-08-31 10:27:01.509+05:30', '/api/media/file/Radha%20%26%20Krishna.png', NULL, 'Radha & Krishna.png', 'image/png', 3026618, 1408, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (84, 'Hindi', '2026-08-31 10:35:56.84+05:30', '2026-08-31 10:35:56.839+05:30', '/api/media/file/Hindi.png', NULL, 'Hindi.png', 'image/png', 13330, 812, 337, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (85, 'Hindi', '2026-08-31 10:36:23.874+05:30', '2026-08-31 10:36:23.873+05:30', '/api/media/file/Hindi-1.png', NULL, 'Hindi-1.png', 'image/png', 13330, 812, 337, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (86, 'videos', '2026-08-31 10:47:59.331+05:30', '2026-08-31 10:47:59.324+05:30', '/api/media/file/videos-1.png', NULL, 'videos-1.png', 'image/png', 152498, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (87, 'Devotional', '2026-08-31 10:59:19.761+05:30', '2026-08-31 10:59:19.753+05:30', '/api/media/file/Devotional-books-1.png', NULL, 'Devotional-books-1.png', 'image/png', 159234, 285, 270, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (88, 'English.png', '2026-08-31 12:35:03.11+05:30', '2026-08-31 12:34:31.927+05:30', '/api/media/file/English.png', NULL, 'English.png', 'image/png', 3105, 393, 263, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (89, 'Hindi.png', '2026-08-31 12:36:05.309+05:30', '2026-08-31 12:36:05.309+05:30', '/api/media/file/Hindi-2.png', NULL, 'Hindi-2.png', 'image/png', 2368, 406, 271, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (90, 'Telugu.png', '2026-08-31 12:36:50.482+05:30', '2026-08-31 12:36:50.482+05:30', '/api/media/file/Telugu.png', NULL, 'Telugu.png', 'image/png', 4605, 407, 295, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (91, 'Malayalam.png', '2026-08-31 12:37:29.568+05:30', '2026-08-31 12:37:21.53+05:30', '/api/media/file/Malayalam.png', NULL, 'Malayalam.png', 'image/png', 5921, 408, 275, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (92, 'Malayalam.png', '2026-08-31 12:37:51.214+05:30', '2026-08-31 12:37:51.214+05:30', '/api/media/file/Malayalam-1.png', NULL, 'Malayalam-1.png', 'image/png', 5921, 408, 275, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (93, '3rd-Banner-BVM.png', '2026-08-31 12:41:26.573+05:30', '2026-08-31 12:41:26.572+05:30', '/api/media/file/3rd-Banner-BVM-1.png', NULL, '3rd-Banner-BVM-1.png', 'image/png', 2188250, 1584, 672, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (94, 'Krishna & Balaram.png', '2026-08-31 14:41:53.628+05:30', '2026-08-31 14:41:53.628+05:30', '/api/media/file/Krishna%20%26%20Balaram-4.png', NULL, 'Krishna & Balaram-4.png', 'image/png', 2775901, 1402, 726, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (95, 'Lord Krishna''s Divine Birth.jpg', '2026-08-31 15:00:26.105+05:30', '2026-08-31 15:00:26.104+05:30', '/api/media/file/Lord%20Krishna''s%20Divine%20Birth.jpg', NULL, 'Lord Krishna''s Divine Birth.jpg', 'image/jpeg', 125137, 1024, 572, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (96, '2.png', '2026-08-31 15:01:41.879+05:30', '2026-08-31 15:01:41.879+05:30', '/api/media/file/2.png', NULL, '2.png', 'image/png', 2223529, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (97, '3.png', '2026-08-31 15:02:36.405+05:30', '2026-08-31 15:02:36.405+05:30', '/api/media/file/3.png', NULL, '3.png', 'image/png', 2206715, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (98, '4.png', '2026-08-31 15:03:28.551+05:30', '2026-08-31 15:03:28.551+05:30', '/api/media/file/4.png', NULL, '4.png', 'image/png', 2578098, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (99, '5.png', '2026-08-31 15:04:23.334+05:30', '2026-08-31 15:04:23.334+05:30', '/api/media/file/5.png', NULL, '5.png', 'image/png', 2643228, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (100, '6.png', '2026-08-31 15:05:18.476+05:30', '2026-08-31 15:05:18.475+05:30', '/api/media/file/6.png', NULL, '6.png', 'image/png', 2647741, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (101, '7.png', '2026-08-31 15:06:07.968+05:30', '2026-08-31 15:06:07.967+05:30', '/api/media/file/7.png', NULL, '7.png', 'image/png', 2511453, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (102, '8.png', '2026-08-31 15:07:05.846+05:30', '2026-08-31 15:07:05.846+05:30', '/api/media/file/8.png', NULL, '8.png', 'image/png', 2572131, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (103, '9.png', '2026-08-31 15:07:58.166+05:30', '2026-08-31 15:07:58.166+05:30', '/api/media/file/9.png', NULL, '9.png', 'image/png', 2814528, 1376, 768, 50, 50);
INSERT INTO public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) VALUES (104, '10.png', '2026-08-31 15:08:56.786+05:30', '2026-08-31 15:08:56.786+05:30', '/api/media/file/10.png', NULL, '10.png', 'image/png', 2342985, 1376, 768, 50, 50);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders (id, items, total, customer_name, customer_email, customer_phone, shipping_address, razorpay_order_id, razorpay_payment_id, status, updated_at, created_at) VALUES (1, '[{"id": 5, "qty": 1, "image": "/api/media/file/BHAGAVAD%20GITA.jpg", "price": 700, "title": "Bhagavad-gita as it Is"}, {"id": 4, "qty": 1, "image": "/api/media/file/Introduction%20of%20Krishna%20Consciousness-1.jpg", "price": 800, "title": "Bhagavad-gita"}]', 1500, 'Arjun', 'arjunraman27@gmail.com', '9344525060', '1111/2, Mahathma Street, V.O.C.Nagar, Melamadai, Madurai - 20', NULL, NULL, 'pending', '2026-08-22 12:17:21.148+05:30', '2026-08-22 12:17:21.148+05:30');
INSERT INTO public.orders (id, items, total, customer_name, customer_email, customer_phone, shipping_address, razorpay_order_id, razorpay_payment_id, status, updated_at, created_at) VALUES (2, '[{"id": 5, "qty": 1, "image": "/api/media/file/BHAGAVAD%20GITA.jpg", "price": 700, "title": "Bhagavad-gita as it Is"}, {"id": 4, "qty": 1, "image": "/api/media/file/Introduction%20of%20Krishna%20Consciousness-1.jpg", "price": 800, "title": "Bhagavad-gita"}]', 1500, 'Balaji', 'balajiraman27@gmail.com', '9344525060', '1111/2, Mahathma Street, V.O.C.Nagar, Melamadai, Madurai - 20', NULL, NULL, 'pending', '2026-08-22 12:17:58.989+05:30', '2026-08-22 12:17:58.989+05:30');
INSERT INTO public.orders (id, items, total, customer_name, customer_email, customer_phone, shipping_address, razorpay_order_id, razorpay_payment_id, status, updated_at, created_at) VALUES (3, '[{"id": 5, "qty": 1, "image": "/api/media/file/BHAGAVAD%20GITA.jpg", "price": 700, "title": "Bhagavad-gita as it Is"}, {"id": 4, "qty": 1, "image": "/api/media/file/Introduction%20of%20Krishna%20Consciousness-1.jpg", "price": 800, "title": "Bhagavad-gita"}]', 1500, 'KANNAN RAMAN', 'kannanramansarumathi@gmail.com', '09344525060', '1111/2, Mahathma Street, V.O.C.Nagar, Melamadai, Madurai - 20', NULL, NULL, 'pending', '2026-08-22 12:34:16.009+05:30', '2026-08-22 12:34:16.009+05:30');
INSERT INTO public.orders (id, items, total, customer_name, customer_email, customer_phone, shipping_address, razorpay_order_id, razorpay_payment_id, status, updated_at, created_at) VALUES (4, '[{"id": 5, "qty": 1, "image": "/api/media/file/BHAGAVAD%20GITA.jpg", "price": 700, "title": "Bhagavad-gita as it Is"}]', 700, 'Thilaga ', 'thilaga@gmail.com', '9080888080', '1111/2, Mahathma Street, V.O.C.Nagar, Melamadai, Madurai - 20', NULL, NULL, 'pending', '2026-08-22 13:03:22.199+05:30', '2026-08-22 13:03:22.199+05:30');
INSERT INTO public.orders (id, items, total, customer_name, customer_email, customer_phone, shipping_address, razorpay_order_id, razorpay_payment_id, status, updated_at, created_at) VALUES (5, '[{"id": 5, "qty": 2, "image": "/api/media/file/BHAGAVAD%20GITA.jpg", "price": 700, "title": "Bhagavad-gita as it Is"}, {"id": 6, "qty": 2, "image": "/api/media/file/Shrimad%20Bhagavad%20Gita-1.jpg", "price": 500, "title": "Bhagavad Gita"}]', 2400, 'Pavithra', 'pavithra@gmail.com', '9876543212', '1111/2, Mahathma Street, V.O.C.Nagar, Melamadai, Madurai - 20', NULL, NULL, 'pending', '2026-08-22 13:06:41.953+05:30', '2026-08-22 13:06:41.953+05:30');
INSERT INTO public.orders (id, items, total, customer_name, customer_email, customer_phone, shipping_address, razorpay_order_id, razorpay_payment_id, status, updated_at, created_at) VALUES (14, '[{"id": 3, "qty": 1, "image": "/api/media/file/Radha-Krishna.jpg", "price": 400, "title": "Radha-Krishna"}]', 400, 'KANNAN RAMAN', 'kannanramansarumathi@gmail.com', '09344525060', '1111/2, Mahathma Street, V.O.C.Nagar, Melamadai, Madurai - 20', NULL, NULL, 'pending', '2026-08-25 12:20:45.584+05:30', '2026-08-25 12:20:45.583+05:30');
INSERT INTO public.orders (id, items, total, customer_name, customer_email, customer_phone, shipping_address, razorpay_order_id, razorpay_payment_id, status, updated_at, created_at) VALUES (15, '[{"id": 6, "qty": 3, "image": "/api/media/file/Shrimad%20Bhagavad%20Gita-1.jpg", "price": 500, "title": "Bhagavad Gita"}]', 1500, 'KANNAN RAMAN', 'kannanramansarumathi@gmail.com', '09344525060', '1111/2, Mahathma Street, V.O.C.Nagar, Melamadai, Madurai - 20', NULL, NULL, 'pending', '2026-08-25 14:58:56.416+05:30', '2026-08-25 14:58:56.415+05:30');


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payload_locked_documents (id, global_slug, updated_at, created_at) VALUES (93, NULL, '2026-08-31 12:37:02.32+05:30', '2026-08-31 12:37:02.32+05:30');
INSERT INTO public.payload_locked_documents (id, global_slug, updated_at, created_at) VALUES (102, 'homepage', '2026-08-31 15:44:55.189+05:30', '2026-08-31 15:40:20.374+05:30');


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, categories_id, videos_id, songs_id, courses_id, products_id, donations_id, testimonials_id, orders_id, languages_id, channels_id, video_categories_id, authors_id) VALUES (190, NULL, 102, 'user', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payload_migrations (id, name, batch, updated_at, created_at) VALUES (1, 'dev', -1, '2026-09-01 14:32:17.128+05:30', '2026-08-20 10:50:23.003+05:30');


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (3, 'collection-media', '{"editViewType": "default"}', '2026-08-20 11:19:18.278+05:30', '2026-08-20 11:19:18.287+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (4, 'collection-songs', '{"limit": 10, "editViewType": "default"}', '2026-08-20 15:41:12.603+05:30', '2026-08-20 11:50:31.088+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (6, 'collection-users', '{}', '2026-08-20 15:49:57.278+05:30', '2026-08-20 15:49:57.278+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (5, 'collection-courses', '{"editViewType": "default"}', '2026-08-21 10:35:54.472+05:30', '2026-08-20 11:54:16.81+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (8, 'collection-testimonials', '{"limit": 10, "editViewType": "default"}', '2026-08-21 12:17:15.888+05:30', '2026-08-21 12:14:29.552+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (11, 'collection-orders', '{"limit": 10, "editViewType": "default"}', '2026-08-22 12:13:46.94+05:30', '2026-08-22 12:04:06.458+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (7, 'collection-products', '{"limit": 10, "columns": [{"active": true, "accessor": "title"}, {"active": true, "accessor": "description"}, {"active": true, "accessor": "images"}, {"active": true, "accessor": "price"}, {"active": true, "accessor": "id"}, {"active": true, "accessor": "comparePrice"}, {"active": true, "accessor": "stock"}, {"active": true, "accessor": "category"}, {"active": true, "accessor": "productType"}, {"active": true, "accessor": "featured"}, {"active": true, "accessor": "updatedAt"}, {"active": true, "accessor": "createdAt"}], "editViewType": "default"}', '2026-08-25 11:54:19.549+05:30', '2026-08-21 10:57:29.208+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (1, 'collection-categories', '{"limit": 10, "editViewType": "default"}', '2026-08-27 12:13:47.949+05:30', '2026-08-20 11:10:17.314+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (2, 'collection-videos', '{"sort": "thumbnail", "limit": 10, "columns": [{"active": true, "accessor": "title"}, {"active": true, "accessor": "description"}, {"active": true, "accessor": "thumbnail"}, {"active": true, "accessor": "videoType"}, {"active": false, "accessor": "id"}, {"active": false, "accessor": "youtubeUrl"}, {"active": false, "accessor": "videoFile"}, {"active": false, "accessor": "category"}, {"active": true, "accessor": "languageCategory"}, {"active": true, "accessor": "duration"}, {"active": false, "accessor": "featured"}, {"active": false, "accessor": "publishedDate"}, {"active": false, "accessor": "updatedAt"}, {"active": false, "accessor": "createdAt"}], "editViewType": "default"}', '2026-08-27 15:04:08.277+05:30', '2026-08-20 11:14:43.379+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (10, 'nav', '{"open": false, "groups": {"Site Settings": {"open": true}}}', '2026-08-27 15:42:20.913+05:30', '2026-08-21 13:01:44.805+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (13, 'collection-donations', '{"editViewType": "default"}', '2026-08-29 14:31:56.089+05:30', '2026-08-29 14:31:51.25+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (14, 'collection-videos-19', '{"fields": {"channel": {"collapsed": []}, "category": {"collapsed": []}}}', '2026-08-31 12:49:57.739+05:30', '2026-08-31 12:47:27.906+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (15, 'collection-channels', '{"limit": 10, "editViewType": "default"}', '2026-08-31 14:23:23.617+05:30', '2026-08-31 14:23:19.632+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (16, 'collection-video-categories', '{"editViewType": "default"}', '2026-08-31 14:39:39.718+05:30', '2026-08-31 14:39:37.946+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (12, 'collection-languages', '{"sort": "order", "limit": 10, "editViewType": "default"}', '2026-08-31 15:11:49.875+05:30', '2026-08-27 12:46:54.326+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (9, 'global-homepage', '{"fields": {"heroSlides": {"collapsed": ["6a87ff02c15ee17c01d8ca44", "6a9008b0ee54a53cb7f3aa5e", "6a90148fee54a53cb7f3aa60"]}}, "editViewType": "default"}', '2026-08-31 15:40:49.422+05:30', '2026-08-21 12:59:57.669+05:30');
INSERT INTO public.payload_preferences (id, key, value, updated_at, created_at) VALUES (17, 'collection-authors', '{"limit": 10, "editViewType": "default"}', '2026-09-01 11:05:21.855+05:30', '2026-09-01 10:59:50.987+05:30');


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (5, NULL, 3, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (10, NULL, 4, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (11, NULL, 6, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (12, NULL, 5, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (17, NULL, 8, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (26, NULL, 11, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (36, NULL, 7, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (37, NULL, 1, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (45, NULL, 2, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (48, NULL, 10, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (50, NULL, 13, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (58, NULL, 14, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (61, NULL, 15, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (63, NULL, 16, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (64, NULL, 12, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (69, NULL, 9, 'user', 1);
INSERT INTO public.payload_preferences_rels (id, "order", parent_id, path, users_id) VALUES (72, NULL, 17, 'user', 1);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, title, description, price, compare_price, stock, category_id, product_type, featured, updated_at, created_at) VALUES (1, 'Shrimad Bhagavad Gita', 'Shrimad Bhagavad Gita is a timeless spiritual classic that presents Lord Krishna''s teachings to Arjuna on the battlefield of Kurukshetra. This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport.

Perfect for both beginners and serious spiritual seekers, this book offers profound wisdom on duty, devotion, and the path to self-realization.', 500, NULL, 10, 3, 'book', true, '2026-08-25 11:58:56.336+05:30', '2026-08-21 10:59:01.078+05:30');
INSERT INTO public.products (id, title, description, price, compare_price, stock, category_id, product_type, featured, updated_at, created_at) VALUES (4, 'Bhagavad-gita', '"Shrimad Bhagavad Gita is a timeless spiritual classic that presents Lord Krishna''s teachings to Arjuna on the battlefield of Kurukshetra. This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport. Perfect for both beginners and serious spiritual seekers, this book offers profound wisdom on duty, devotion, and the path to self-realization."', 800, 1000, 22, 3, 'book', true, '2026-08-25 12:27:49.463+05:30', '2026-08-21 11:04:12.847+05:30');
INSERT INTO public.products (id, title, description, price, compare_price, stock, category_id, product_type, featured, updated_at, created_at) VALUES (2, 'Bhagavad Gita As it Is', '"Shrimad Bhagavad Gita is a timeless spiritual classic that presents Lord Krishna''s teachings to Arjuna on the battlefield of Kurukshetra. This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport. Perfect for both beginners and serious spiritual seekers, this book offers profound wisdom on duty, devotion, and the path to self-realization."', 600, 900, 15, 3, 'book', true, '2026-08-25 12:27:49.497+05:30', '2026-08-21 11:01:18.077+05:30');
INSERT INTO public.products (id, title, description, price, compare_price, stock, category_id, product_type, featured, updated_at, created_at) VALUES (5, 'Bhagavad-gita as it Is', '"Shrimad Bhagavad Gita is a timeless spiritual classic that presents Lord Krishna''s teachings to Arjuna on the battlefield of Kurukshetra. This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport. Perfect for both beginners and serious spiritual seekers, this book offers profound wisdom on duty, devotion, and the path to self-realization."', 700, 1000, -3, 3, 'book', true, '2026-08-25 15:10:46.011+05:30', '2026-08-21 11:05:50.296+05:30');
INSERT INTO public.products (id, title, description, price, compare_price, stock, category_id, product_type, featured, updated_at, created_at) VALUES (3, 'Radha-Krishna', '"Shrimad Bhagavad Gita is a timeless spiritual classic that presents Lord Krishna''s teachings to Arjuna on the battlefield of Kurukshetra. This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport. Perfect for both beginners and serious spiritual seekers, this book offers profound wisdom on duty, devotion, and the path to self-realization."', 400, 700, 0, 3, 'book', true, '2026-08-25 15:11:20.829+05:30', '2026-08-21 11:02:35.391+05:30');
INSERT INTO public.products (id, title, description, price, compare_price, stock, category_id, product_type, featured, updated_at, created_at) VALUES (7, 'Krishna-radha', '"Shrimad Bhagavad Gita is a timeless spiritual classic that presents Lord Krishna''s teachings to Arjuna on the battlefield of Kurukshetra. This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport. Perfect for both beginners and serious spiritual seekers, this book offers profound wisdom on duty, devotion, and the path to self-realization."', 600, 1000, 2, 4, 'book', true, '2026-08-26 12:54:04.776+05:30', '2026-08-25 15:06:25.215+05:30');
INSERT INTO public.products (id, title, description, price, compare_price, stock, category_id, product_type, featured, updated_at, created_at) VALUES (6, 'Bhagavad Gita', '"Shrimad Bhagavad Gita is a timeless spiritual classic that presents Lord Krishna''s teachings to Arjuna on the battlefield of Kurukshetra. This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport. Perfect for both beginners and serious spiritual seekers, this book offers profound wisdom on duty, devotion, and the path to self-realization."', 500, 800, 0, 3, 'book', true, '2026-08-26 12:57:01.754+05:30', '2026-08-21 11:07:16.681+05:30');


--
-- Data for Name: products_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products_images (_order, _parent_id, id, image_id) VALUES (1, 1, '6a87e1ddf6a4c2ee0e7fe8bf', 21);
INSERT INTO public.products_images (_order, _parent_id, id, image_id) VALUES (1, 4, '6a87e323f6a4c2ee0e7fe8c5', 18);
INSERT INTO public.products_images (_order, _parent_id, id, image_id) VALUES (1, 2, '6a87e257f6a4c2ee0e7fe8c1', 16);
INSERT INTO public.products_images (_order, _parent_id, id, image_id) VALUES (1, 5, '6a87e3a5f6a4c2ee0e7fe8c7', 19);
INSERT INTO public.products_images (_order, _parent_id, id, image_id) VALUES (1, 3, '6a87e2cff6a4c2ee0e7fe8c3', 17);
INSERT INTO public.products_images (_order, _parent_id, id, image_id) VALUES (1, 7, '6a8d61d86ddd3b52b46dd8c4', 50);
INSERT INTO public.products_images (_order, _parent_id, id, image_id) VALUES (1, 6, '6a87e3fbf6a4c2ee0e7fe8c9', 20);


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.songs (id, title, artist, cover_image_id, audio_type, youtube_url, audio_file_id, category_id, duration, featured, updated_at, created_at, language_category_id, author_id, is_regular, is_mantra, is_sloka) VALUES (4, 'Hare Krishna Mahamanthra', 'Radhakrishnan', 47, 'youtube', '/', NULL, 2, '0.40', true, '2026-09-01 12:38:28.665+05:30', '2026-08-22 12:33:26.292+05:30', 2, NULL, false, true, false);
INSERT INTO public.songs (id, title, artist, cover_image_id, audio_type, youtube_url, audio_file_id, category_id, duration, featured, updated_at, created_at, language_category_id, author_id, is_regular, is_mantra, is_sloka) VALUES (5, 'Krishna-Balaram', 'Pranav', 51, 'upload', NULL, 52, 2, '0.30', true, '2026-09-01 12:38:28.707+05:30', '2026-08-26 11:57:53.977+05:30', 1, 2, false, true, false);
INSERT INTO public.songs (id, title, artist, cover_image_id, audio_type, youtube_url, audio_file_id, category_id, duration, featured, updated_at, created_at, language_category_id, author_id, is_regular, is_mantra, is_sloka) VALUES (3, 'Hare Krishna Mahamanthra', 'Radha', 46, 'youtube', '/', NULL, 2, '0.30', true, '2026-09-01 12:38:39.808+05:30', '2026-08-22 12:31:47.856+05:30', 3, NULL, false, false, true);
INSERT INTO public.songs (id, title, artist, cover_image_id, audio_type, youtube_url, audio_file_id, category_id, duration, featured, updated_at, created_at, language_category_id, author_id, is_regular, is_mantra, is_sloka) VALUES (2, 'Hare Krishna Mahamanthra', 'Krishnan', 45, 'youtube', '/', NULL, 2, '0.22', true, '2026-09-01 12:38:39.812+05:30', '2026-08-22 12:30:41.065+05:30', 3, NULL, false, false, true);
INSERT INTO public.songs (id, title, artist, cover_image_id, audio_type, youtube_url, audio_file_id, category_id, duration, featured, updated_at, created_at, language_category_id, author_id, is_regular, is_mantra, is_sloka) VALUES (1, 'Hare Krishna Mahamanthra', 'Kannan', 43, 'upload', NULL, 44, 2, '0.22', true, '2026-09-01 12:38:50.419+05:30', '2026-08-20 15:42:10.395+05:30', 5, NULL, true, false, false);


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.testimonials (id, name, location, photo_id, message, rating, featured, updated_at, created_at) VALUES (1, 'Tharun S', 'Bengaluru, India', 23, 'The Videos and Courses have helped me to understand The Krishnas Consciousness', 5, true, '2026-08-21 12:18:45.07+05:30', '2026-08-21 12:18:45.07+05:30');
INSERT INTO public.testimonials (id, name, location, photo_id, message, rating, featured, updated_at, created_at) VALUES (2, 'Aswini v', 'Chennai, India', 24, 'I especially appreciate  the structured courses and devotional Videos ', 5, true, '2026-08-21 12:20:13.552+05:30', '2026-08-21 12:20:13.552+05:30');
INSERT INTO public.testimonials (id, name, location, photo_id, message, rating, featured, updated_at, created_at) VALUES (3, 'Abisheik R', 'Coimbatore, India ', 25, 'BVM has made Spiritual Knowledge so accessible', 3, true, '2026-08-21 12:21:59.052+05:30', '2026-08-21 12:21:59.052+05:30');
INSERT INTO public.testimonials (id, name, location, photo_id, message, rating, featured, updated_at, created_at) VALUES (4, 'Saravanan P', 'Bengaluru, India', 26, 'The Videos and Courses have helped me to understand the Krishnas Consciousness in a simple and Practical way.', 4, false, '2026-08-21 12:24:05.388+05:30', '2026-08-21 12:24:05.388+05:30');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) VALUES (1, '2026-08-20 14:58:58.968+05:30', '2026-08-20 10:53:16.17+05:30', 'arjunraman27@gmail.com', NULL, NULL, 'eb3f399c9863cc3fb6110d874f7add497bf2ee074dcba0d1cdfd32f03abf30d3', 'a6c0e027371e29e16e60db66b1fe5f3fc224a3c735f1f66f5f9e81054319984902430098ddf2cb71473984546a9d16823286869eb5196bd478ab21f023fae9025f1dd89ecd26065af638d7a13b7ca8525e7bc09bf11e25ecf837a02b8b5ff6ee5d2d6036a957ca5c0b18a3159b02e259e447d236453adac635fd4b972c36c532693be6ff9265e154645e444bf278dcc4fea20d1679e6eb288b20aca7d1c993410c2aec8046851ae3a8efbc4bb7b1b936279cbae0a0eef8f7cd6ddf591696b10561b0145171966e3ef7111dbe717afb772422e189832631f0985870dd3256f86b610d8849f0b2c1f6ec383f4132a990e0e34505e0e5838d1f3275b3bd71784aeda4c5606b976ecb796e084b5b8fae1e55ba38bf9ca726a7f701ddf8eb932788d261e19829c803d00b59075d3877596af418dd01794a1bd3ba8e92f8b89ab897c89bc2d54c107e9d37794aa72917e186f4ab2924d1fee120a29a3c05c4af6a8b457484a489e7e1e9512c4a4df69b615a43ce9406d5d6fbd4a3d39285ac1976456d76e8bb3d775ea83a2e9a4e0a64f5f8d3be5c3f997881d78d2e47384ba58e8bae241e0cb375b45cd2c729b516c402908f1d7b39be1d957a94a330a81708b8d5a23d9849e35fb8e080daccadf13b2a4bb958e3bcf17b9bcedd6b1e2f0451a7fccf78982f02073376b90fcaf16c0c82482ccd21e351a28bac4a28efdb57c3215c3c', 0, NULL);


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_sessions (_order, _parent_id, id, created_at, expires_at) VALUES (1, 1, '899d5e42-5fca-4ef8-933f-7ad4521bf04e', '2026-09-01 15:26:15.548+05:30', '2026-09-01 17:26:15.548+05:30');


--
-- Data for Name: video_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.video_categories (id, name, updated_at, created_at) VALUES (1, 'Lectures & Seminars', '2026-08-31 14:39:48.923+05:30', '2026-08-31 14:39:48.923+05:30');
INSERT INTO public.video_categories (id, name, updated_at, created_at) VALUES (2, 'Bhajans & Kirtans', '2026-08-31 14:40:01.814+05:30', '2026-08-31 14:40:01.814+05:30');
INSERT INTO public.video_categories (id, name, updated_at, created_at) VALUES (3, 'Documentaries & Movies', '2026-08-31 14:40:12.337+05:30', '2026-08-31 14:40:12.336+05:30');
INSERT INTO public.video_categories (id, name, updated_at, created_at) VALUES (4, 'Shorts & Reels', '2026-08-31 14:40:22.09+05:30', '2026-08-31 14:40:22.09+05:30');
INSERT INTO public.video_categories (id, name, updated_at, created_at) VALUES (5, 'Interviews & Dialogues', '2026-08-31 14:40:34.074+05:30', '2026-08-31 14:40:34.074+05:30');


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (30, 'The Teachings of Lord Krishna', 'Discover the timeless teachings of Lord Krishna for everyday life.
His wisdom teaches us to stay calm, follow our Dharma, and perform our duties with devotion.
Let Krishna''s words guide your heart toward peace and purpose.', 104, 'youtube', '/', NULL, '4.00', true, '2026-08-31 15:08:25.993+05:30', '2026-08-31 15:09:12.274+05:30', '2026-08-31 15:09:12.274+05:30', 3, 2, 2);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (27, 'Krishna in the Mahabharata', 'Discover Krishna''s powerful role in the epic Mahabharata.
As a guide, strategist, and protector, He helped the Pandavas through their greatest challenges.
His wisdom continues to inspire millions around the world.', 101, 'youtube', '/', NULL, '4.00', true, '2026-08-31 15:05:43.736+05:30', '2026-09-01 09:45:31.396+05:30', '2026-08-31 15:06:30.899+05:30', 2, 2, 4);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (28, 'Krishna & Bhagavad-Gita', 'Explore the timeless conversation between Krishna and Arjuna on the battlefield of Kurukshetra.
Krishna teaches the importance of Dharma, Karma, devotion, and selfless action.
A divine message that remains relevant in every generation.', 102, 'youtube', '/', NULL, '3.00', true, '2026-08-31 15:06:35.983+05:30', '2026-09-01 09:45:31.426+05:30', '2026-08-31 15:07:27.004+05:30', 1, 2, 5);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (21, 'The Birth of Lord Krishna', 'Discover the divine birth of Lord Krishna in Mathura.
Learn how He came to Earth to protect righteousness and guide humanity.
A beautiful beginning to the story of the beloved Krishna.', 95, 'youtube', '/', NULL, '4.00', true, '2026-08-31 14:42:58.652+05:30', '2026-09-01 09:45:31.458+05:30', '2026-08-31 15:01:08.946+05:30', 2, 2, 3);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (20, 'Krishna & Balaram', 'Krishna and Balaram were divine brothers, known for their deep love and unbreakable bond.
Krishna, the playful and compassionate one, brought joy and guided people toward dharma.
Balaram, strong and courageous, always stood beside Krishna and protected righteousness.
Together, their inspiring journey teaches us about love, strength, loyalty, and devotion.', 94, 'youtube', '/', NULL, '2.00', true, '2026-08-31 14:40:40.425+05:30', '2026-09-01 09:45:31.471+05:30', '2026-08-31 14:42:54.482+05:30', 1, 5, 3);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (29, 'The Govardhan Hill Story', 'Discover how Krishna protected the people of Vrindavan by lifting Govardhan Hill.
This divine Leela teaches faith, humility, and complete surrender to God.
A powerful story of Krishna''s love and protection.', 103, 'youtube', '/', NULL, '4.00', true, '2026-08-31 15:07:31.979+05:30', '2026-09-01 09:45:31.479+05:30', '2026-08-31 15:08:19.279+05:30', 2, 3, 3);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (26, 'Krishna & Vrindavan', 'Step into the beautiful world of Krishna''s Vrindavan.
Surrounded by cows, friends, nature, and joyful Leelas, Krishna filled Vrindavan with divine happiness.
A peaceful journey into the land of devotion.', 100, 'youtube', '/', NULL, '4.00', true, '2026-08-31 15:04:52.631+05:30', '2026-09-01 09:45:31.496+05:30', '2026-08-31 15:05:33.845+05:30', 8, 4, 2);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (22, 'Krishna''s Childhood Leelas', 'Explore the playful and heartwarming childhood stories of Krishna.
From stealing butter to his innocent mischief, every Leela holds a deeper meaning.
Discover the divine charm behind Krishna''s childhood.', 96, 'youtube', '/', NULL, '4.00', true, '2026-08-31 15:01:15.203+05:30', '2026-09-01 09:45:31.854+05:30', '2026-08-31 15:02:05.907+05:30', 1, 5, 1);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (24, 'Krishna & Radha – Divine Love', 'Explore the eternal bond between Krishna and Radha.
Their love represents pure devotion beyond worldly expectations.
A timeless story of divine love, faith, and spiritual connection.', 98, 'youtube', '/', NULL, '3.00', true, '2026-08-31 15:03:01.909+05:30', '2026-09-01 09:45:31.865+05:30', '2026-08-31 15:03:48.151+05:30', 3, 2, 4);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (23, 'Krishna & His Divine Flute', 'Discover the magical significance of Krishna''s enchanting flute.
Its divine melody symbolizes love, surrender, and the call of the soul.
Let Krishna''s flute fill your heart with peace and devotion.', 97, 'youtube', '/', NULL, '5.00', true, '2026-08-31 15:02:10.123+05:30', '2026-09-01 09:45:31.878+05:30', '2026-08-31 15:02:55.458+05:30', 2, 2, 2);
INSERT INTO public.videos (id, title, description, thumbnail_id, video_type, youtube_url, video_file_id, duration, featured, published_date, updated_at, created_at, language_category_id, channel_id, category_id) VALUES (25, 'Krishna & Balaram', 'Discover the beautiful bond between Lord Krishna and His brother Balaram.
Their journey reflects love, courage, strength, and unwavering loyalty.
Together, they faced challenges and protected righteousness.', 99, 'youtube', '/', NULL, '4.00', true, '2026-08-31 15:03:53.503+05:30', '2026-09-01 09:45:31.892+05:30', '2026-08-31 15:04:45.01+05:30', 5, 1, 3);


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 10, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- Name: channels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.channels_id_seq', 6, true);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 5, true);


--
-- Name: donations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.donations_id_seq', 1, false);


--
-- Name: homepage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.homepage_id_seq', 1, true);


--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.languages_id_seq', 8, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 104, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 15, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 105, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 196, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 17, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 72, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 7, true);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.songs_id_seq', 5, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: video_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.video_categories_id_seq', 5, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 30, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: courses_lessons courses_lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses_lessons
    ADD CONSTRAINT courses_lessons_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: donations donations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_pkey PRIMARY KEY (id);


--
-- Name: homepage_hero_slides homepage_hero_slides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_hero_slides
    ADD CONSTRAINT homepage_hero_slides_pkey PRIMARY KEY (id);


--
-- Name: homepage homepage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage
    ADD CONSTRAINT homepage_pkey PRIMARY KEY (id);


--
-- Name: homepage_video_filters_category_options homepage_video_filters_category_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_video_filters_category_options
    ADD CONSTRAINT homepage_video_filters_category_options_pkey PRIMARY KEY (id);


--
-- Name: homepage_video_filters_channel_options homepage_video_filters_channel_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_video_filters_channel_options
    ADD CONSTRAINT homepage_video_filters_channel_options_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: products_images products_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_images
    ADD CONSTRAINT products_images_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: video_categories video_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_categories
    ADD CONSTRAINT video_categories_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: authors_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authors_created_at_idx ON public.authors USING btree (created_at);


--
-- Name: authors_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX authors_name_idx ON public.authors USING btree (name);


--
-- Name: authors_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX authors_slug_idx ON public.authors USING btree (slug);


--
-- Name: authors_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authors_updated_at_idx ON public.authors USING btree (updated_at);


--
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);


--
-- Name: categories_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_image_idx ON public.categories USING btree (image_id);


--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);


--
-- Name: channels_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX channels_created_at_idx ON public.channels USING btree (created_at);


--
-- Name: channels_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX channels_name_idx ON public.channels USING btree (name);


--
-- Name: channels_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX channels_updated_at_idx ON public.channels USING btree (updated_at);


--
-- Name: courses_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_category_idx ON public.courses USING btree (category_id);


--
-- Name: courses_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_created_at_idx ON public.courses USING btree (created_at);


--
-- Name: courses_lessons_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_lessons_order_idx ON public.courses_lessons USING btree (_order);


--
-- Name: courses_lessons_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_lessons_parent_id_idx ON public.courses_lessons USING btree (_parent_id);


--
-- Name: courses_lessons_video_file_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_lessons_video_file_idx ON public.courses_lessons USING btree (video_file_id);


--
-- Name: courses_thumbnail_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_thumbnail_idx ON public.courses USING btree (thumbnail_id);


--
-- Name: courses_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_updated_at_idx ON public.courses USING btree (updated_at);


--
-- Name: donations_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX donations_created_at_idx ON public.donations USING btree (created_at);


--
-- Name: donations_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX donations_updated_at_idx ON public.donations USING btree (updated_at);


--
-- Name: homepage_hero_slides_background_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_hero_slides_background_image_idx ON public.homepage_hero_slides USING btree (background_image_id);


--
-- Name: homepage_hero_slides_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_hero_slides_order_idx ON public.homepage_hero_slides USING btree (_order);


--
-- Name: homepage_hero_slides_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_hero_slides_parent_id_idx ON public.homepage_hero_slides USING btree (_parent_id);


--
-- Name: homepage_video_filters_category_options_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_video_filters_category_options_order_idx ON public.homepage_video_filters_category_options USING btree (_order);


--
-- Name: homepage_video_filters_category_options_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_video_filters_category_options_parent_id_idx ON public.homepage_video_filters_category_options USING btree (_parent_id);


--
-- Name: homepage_video_filters_channel_options_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_video_filters_channel_options_order_idx ON public.homepage_video_filters_channel_options USING btree (_order);


--
-- Name: homepage_video_filters_channel_options_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX homepage_video_filters_channel_options_parent_id_idx ON public.homepage_video_filters_channel_options USING btree (_parent_id);


--
-- Name: languages_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX languages_created_at_idx ON public.languages USING btree (created_at);


--
-- Name: languages_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX languages_image_idx ON public.languages USING btree (image_id);


--
-- Name: languages_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX languages_slug_idx ON public.languages USING btree (slug);


--
-- Name: languages_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX languages_updated_at_idx ON public.languages USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: orders_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_created_at_idx ON public.orders USING btree (created_at);


--
-- Name: orders_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_updated_at_idx ON public.orders USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_authors_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_authors_id_idx ON public.payload_locked_documents_rels USING btree (authors_id);


--
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);


--
-- Name: payload_locked_documents_rels_channels_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_channels_id_idx ON public.payload_locked_documents_rels USING btree (channels_id);


--
-- Name: payload_locked_documents_rels_courses_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_courses_id_idx ON public.payload_locked_documents_rels USING btree (courses_id);


--
-- Name: payload_locked_documents_rels_donations_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_donations_id_idx ON public.payload_locked_documents_rels USING btree (donations_id);


--
-- Name: payload_locked_documents_rels_languages_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_languages_id_idx ON public.payload_locked_documents_rels USING btree (languages_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_orders_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_orders_id_idx ON public.payload_locked_documents_rels USING btree (orders_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_products_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_products_id_idx ON public.payload_locked_documents_rels USING btree (products_id);


--
-- Name: payload_locked_documents_rels_songs_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_songs_id_idx ON public.payload_locked_documents_rels USING btree (songs_id);


--
-- Name: payload_locked_documents_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_testimonials_id_idx ON public.payload_locked_documents_rels USING btree (testimonials_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_rels_video_categories_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_video_categories_id_idx ON public.payload_locked_documents_rels USING btree (video_categories_id);


--
-- Name: payload_locked_documents_rels_videos_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_rels_videos_id_idx ON public.payload_locked_documents_rels USING btree (videos_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: products_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_category_idx ON public.products USING btree (category_id);


--
-- Name: products_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_created_at_idx ON public.products USING btree (created_at);


--
-- Name: products_images_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_images_image_idx ON public.products_images USING btree (image_id);


--
-- Name: products_images_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_images_order_idx ON public.products_images USING btree (_order);


--
-- Name: products_images_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_images_parent_id_idx ON public.products_images USING btree (_parent_id);


--
-- Name: products_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_updated_at_idx ON public.products USING btree (updated_at);


--
-- Name: songs_audio_file_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX songs_audio_file_idx ON public.songs USING btree (audio_file_id);


--
-- Name: songs_author_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX songs_author_idx ON public.songs USING btree (author_id);


--
-- Name: songs_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX songs_category_idx ON public.songs USING btree (category_id);


--
-- Name: songs_cover_image_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX songs_cover_image_idx ON public.songs USING btree (cover_image_id);


--
-- Name: songs_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX songs_created_at_idx ON public.songs USING btree (created_at);


--
-- Name: songs_language_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX songs_language_category_idx ON public.songs USING btree (language_category_id);


--
-- Name: songs_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX songs_updated_at_idx ON public.songs USING btree (updated_at);


--
-- Name: testimonials_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_created_at_idx ON public.testimonials USING btree (created_at);


--
-- Name: testimonials_photo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_photo_idx ON public.testimonials USING btree (photo_id);


--
-- Name: testimonials_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX testimonials_updated_at_idx ON public.testimonials USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: video_categories_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX video_categories_created_at_idx ON public.video_categories USING btree (created_at);


--
-- Name: video_categories_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX video_categories_name_idx ON public.video_categories USING btree (name);


--
-- Name: video_categories_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX video_categories_updated_at_idx ON public.video_categories USING btree (updated_at);


--
-- Name: videos_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX videos_category_idx ON public.videos USING btree (category_id);


--
-- Name: videos_channel_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX videos_channel_idx ON public.videos USING btree (channel_id);


--
-- Name: videos_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX videos_created_at_idx ON public.videos USING btree (created_at);


--
-- Name: videos_language_category_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX videos_language_category_idx ON public.videos USING btree (language_category_id);


--
-- Name: videos_thumbnail_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX videos_thumbnail_idx ON public.videos USING btree (thumbnail_id);


--
-- Name: videos_updated_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX videos_updated_at_idx ON public.videos USING btree (updated_at);


--
-- Name: videos_video_file_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX videos_video_file_idx ON public.videos USING btree (video_file_id);


--
-- Name: categories categories_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: courses courses_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: courses_lessons courses_lessons_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses_lessons
    ADD CONSTRAINT courses_lessons_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: courses_lessons courses_lessons_video_file_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses_lessons
    ADD CONSTRAINT courses_lessons_video_file_id_media_id_fk FOREIGN KEY (video_file_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: courses courses_thumbnail_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_thumbnail_id_media_id_fk FOREIGN KEY (thumbnail_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: homepage_hero_slides homepage_hero_slides_background_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_hero_slides
    ADD CONSTRAINT homepage_hero_slides_background_image_id_media_id_fk FOREIGN KEY (background_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: homepage_hero_slides homepage_hero_slides_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_hero_slides
    ADD CONSTRAINT homepage_hero_slides_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;


--
-- Name: homepage_video_filters_category_options homepage_video_filters_category_options_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_video_filters_category_options
    ADD CONSTRAINT homepage_video_filters_category_options_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;


--
-- Name: homepage_video_filters_channel_options homepage_video_filters_channel_options_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homepage_video_filters_channel_options
    ADD CONSTRAINT homepage_video_filters_channel_options_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.homepage(id) ON DELETE CASCADE;


--
-- Name: languages languages_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_authors_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_authors_fk FOREIGN KEY (authors_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_channels_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_channels_fk FOREIGN KEY (channels_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_courses_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_courses_fk FOREIGN KEY (courses_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_donations_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_donations_fk FOREIGN KEY (donations_id) REFERENCES public.donations(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_languages_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_languages_fk FOREIGN KEY (languages_id) REFERENCES public.languages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_orders_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_orders_fk FOREIGN KEY (orders_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_songs_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_songs_fk FOREIGN KEY (songs_id) REFERENCES public.songs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_video_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_video_categories_fk FOREIGN KEY (video_categories_id) REFERENCES public.video_categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_videos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_videos_fk FOREIGN KEY (videos_id) REFERENCES public.videos(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: products products_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: products_images products_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_images
    ADD CONSTRAINT products_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_images products_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_images
    ADD CONSTRAINT products_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: songs songs_audio_file_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_audio_file_id_media_id_fk FOREIGN KEY (audio_file_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: songs songs_author_id_authors_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_author_id_authors_id_fk FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE SET NULL;


--
-- Name: songs songs_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: songs songs_cover_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_cover_image_id_media_id_fk FOREIGN KEY (cover_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: songs songs_language_category_id_languages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_language_category_id_languages_id_fk FOREIGN KEY (language_category_id) REFERENCES public.languages(id) ON DELETE SET NULL;


--
-- Name: testimonials testimonials_photo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_photo_id_media_id_fk FOREIGN KEY (photo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: videos videos_category_id_video_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_category_id_video_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.video_categories(id) ON DELETE SET NULL;


--
-- Name: videos videos_channel_id_channels_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_channel_id_channels_id_fk FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE SET NULL;


--
-- Name: videos videos_language_category_id_languages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_language_category_id_languages_id_fk FOREIGN KEY (language_category_id) REFERENCES public.languages(id) ON DELETE SET NULL;


--
-- Name: videos videos_thumbnail_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_thumbnail_id_media_id_fk FOREIGN KEY (thumbnail_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: videos videos_video_file_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_video_file_id_media_id_fk FOREIGN KEY (video_file_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--


