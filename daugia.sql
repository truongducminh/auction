PGDMP         9    
            u            DauGia    9.6.1    9.6.1 P    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           1262    25028    DauGia    DATABASE     �   CREATE DATABASE "DauGia" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "DauGia";
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12387    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    25029    TP    TABLE     B   CREATE TABLE "TP" (
    id_tp bigint NOT NULL,
    ten_tp text
);
    DROP TABLE public."TP";
       public         postgres    false    3            �            1259    25035    TP_id_tp_seq    SEQUENCE     p   CREATE SEQUENCE "TP_id_tp_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."TP_id_tp_seq";
       public       postgres    false    3    185            �           0    0    TP_id_tp_seq    SEQUENCE OWNED BY     3   ALTER SEQUENCE "TP_id_tp_seq" OWNED BY "TP".id_tp;
            public       postgres    false    186            �            1259    25037    bank    TABLE     m   CREATE TABLE bank (
    id_bank bigint NOT NULL,
    namebank text,
    codebank text,
    id_user bigint
);
    DROP TABLE public.bank;
       public         postgres    false    3            �            1259    25043    bank_id_bank_seq    SEQUENCE     r   CREATE SEQUENCE bank_id_bank_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.bank_id_bank_seq;
       public       postgres    false    3    187            �           0    0    bank_id_bank_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE bank_id_bank_seq OWNED BY bank.id_bank;
            public       postgres    false    188            �            1259    25045 	   binh_luan    TABLE     z   CREATE TABLE binh_luan (
    id_sp text,
    id_user text,
    mo_ta text,
    ngay_binh_luan timestamp with time zone
);
    DROP TABLE public.binh_luan;
       public         postgres    false    3            �            1259    25051 	   giao_dich    TABLE     �   CREATE TABLE giao_dich (
    id_giao_dich bigint NOT NULL,
    ngaygiaodich timestamp with time zone,
    trangthai integer,
    id_nguoi_mua bigint,
    gia_tri integer,
    id_sp bigint
);
    DROP TABLE public.giao_dich;
       public         postgres    false    3            �            1259    25054    giao_dich_id_giao_dich_seq    SEQUENCE     |   CREATE SEQUENCE giao_dich_id_giao_dich_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.giao_dich_id_giao_dich_seq;
       public       postgres    false    3    190            �           0    0    giao_dich_id_giao_dich_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE giao_dich_id_giao_dich_seq OWNED BY giao_dich.id_giao_dich;
            public       postgres    false    191            �            1259    25056    loai_sp    TABLE     �   CREATE TABLE loai_sp (
    id_loai_sp bigint NOT NULL,
    ten_loai_sp text,
    id_loai_sp_cha bigint,
    tieu_de_thay_the text
);
    DROP TABLE public.loai_sp;
       public         postgres    false    3            �            1259    25062    loai_sp_id_loai_sp_seq    SEQUENCE     x   CREATE SEQUENCE loai_sp_id_loai_sp_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.loai_sp_id_loai_sp_seq;
       public       postgres    false    3    192            �           0    0    loai_sp_id_loai_sp_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE loai_sp_id_loai_sp_seq OWNED BY loai_sp.id_loai_sp;
            public       postgres    false    193            �            1259    25064 	   loai_user    TABLE     K   CREATE TABLE loai_user (
    id_loai bigint NOT NULL,
    ten_loai text
);
    DROP TABLE public.loai_user;
       public         postgres    false    3            �            1259    25070    loai_user_id_loai_seq    SEQUENCE     w   CREATE SEQUENCE loai_user_id_loai_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.loai_user_id_loai_seq;
       public       postgres    false    3    194            �           0    0    loai_user_id_loai_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE loai_user_id_loai_seq OWNED BY loai_user.id_loai;
            public       postgres    false    195            �            1259    25072    nap_tien    TABLE     �   CREATE TABLE nap_tien (
    id_nap bigint NOT NULL,
    phuongthuc text,
    sotiennap integer,
    ngaynap timestamp with time zone,
    id_user bigint
);
    DROP TABLE public.nap_tien;
       public         postgres    false    3            �            1259    25078    nap_tien_id_nap_seq    SEQUENCE     u   CREATE SEQUENCE nap_tien_id_nap_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.nap_tien_id_nap_seq;
       public       postgres    false    196    3            �           0    0    nap_tien_id_nap_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE nap_tien_id_nap_seq OWNED BY nap_tien.id_nap;
            public       postgres    false    197            �            1259    25080    san_pham    TABLE     �  CREATE TABLE san_pham (
    id_sp bigint NOT NULL,
    ten_sp text,
    gia integer,
    hinh text,
    mota text,
    ngaybatdau timestamp with time zone,
    ngayketthuc timestamp with time zone,
    id_user_cao_nhat bigint,
    id_loai_sp bigint,
    id_user_ban bigint,
    mo_ta_tom_tat text,
    tieu_de_thay_the text,
    trang_thai bigint,
    bid_amount integer,
    ngaydang timestamp with time zone
);
    DROP TABLE public.san_pham;
       public         postgres    false    3            �            1259    25086    san_pham_id_sp_seq    SEQUENCE     t   CREATE SEQUENCE san_pham_id_sp_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.san_pham_id_sp_seq;
       public       postgres    false    198    3            �           0    0    san_pham_id_sp_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE san_pham_id_sp_seq OWNED BY san_pham.id_sp;
            public       postgres    false    199            �            1259    25088 	   tinh_quan    TABLE     ]   CREATE TABLE tinh_quan (
    id_tinh bigint NOT NULL,
    ten_tinh text,
    id_tp bigint
);
    DROP TABLE public.tinh_quan;
       public         postgres    false    3            �            1259    25094    tinh_quan_id_tinh_seq    SEQUENCE     w   CREATE SEQUENCE tinh_quan_id_tinh_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.tinh_quan_id_tinh_seq;
       public       postgres    false    3    200            �           0    0    tinh_quan_id_tinh_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE tinh_quan_id_tinh_seq OWNED BY tinh_quan.id_tinh;
            public       postgres    false    201            �            1259    25096    users    TABLE     &  CREATE TABLE users (
    id_user bigint NOT NULL,
    username text,
    password text,
    ho text,
    ten text,
    ngaydangky timestamp with time zone,
    email text,
    sodienthoai text,
    diachi text,
    trangthai integer,
    sodu integer,
    id_loai bigint,
    id_tinh bigint
);
    DROP TABLE public.users;
       public         postgres    false    3            �            1259    25102    users_id_user_seq    SEQUENCE     s   CREATE SEQUENCE users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_id_user_seq;
       public       postgres    false    202    3            �           0    0    users_id_user_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE users_id_user_seq OWNED BY users.id_user;
            public       postgres    false    203                       2604    25104    TP id_tp    DEFAULT     Z   ALTER TABLE ONLY "TP" ALTER COLUMN id_tp SET DEFAULT nextval('"TP_id_tp_seq"'::regclass);
 9   ALTER TABLE public."TP" ALTER COLUMN id_tp DROP DEFAULT;
       public       postgres    false    186    185                       2604    25105    bank id_bank    DEFAULT     ^   ALTER TABLE ONLY bank ALTER COLUMN id_bank SET DEFAULT nextval('bank_id_bank_seq'::regclass);
 ;   ALTER TABLE public.bank ALTER COLUMN id_bank DROP DEFAULT;
       public       postgres    false    188    187                       2604    25106    giao_dich id_giao_dich    DEFAULT     r   ALTER TABLE ONLY giao_dich ALTER COLUMN id_giao_dich SET DEFAULT nextval('giao_dich_id_giao_dich_seq'::regclass);
 E   ALTER TABLE public.giao_dich ALTER COLUMN id_giao_dich DROP DEFAULT;
       public       postgres    false    191    190                       2604    25107    loai_sp id_loai_sp    DEFAULT     j   ALTER TABLE ONLY loai_sp ALTER COLUMN id_loai_sp SET DEFAULT nextval('loai_sp_id_loai_sp_seq'::regclass);
 A   ALTER TABLE public.loai_sp ALTER COLUMN id_loai_sp DROP DEFAULT;
       public       postgres    false    193    192                       2604    25108    loai_user id_loai    DEFAULT     h   ALTER TABLE ONLY loai_user ALTER COLUMN id_loai SET DEFAULT nextval('loai_user_id_loai_seq'::regclass);
 @   ALTER TABLE public.loai_user ALTER COLUMN id_loai DROP DEFAULT;
       public       postgres    false    195    194                       2604    25109    nap_tien id_nap    DEFAULT     d   ALTER TABLE ONLY nap_tien ALTER COLUMN id_nap SET DEFAULT nextval('nap_tien_id_nap_seq'::regclass);
 >   ALTER TABLE public.nap_tien ALTER COLUMN id_nap DROP DEFAULT;
       public       postgres    false    197    196                       2604    25110    san_pham id_sp    DEFAULT     b   ALTER TABLE ONLY san_pham ALTER COLUMN id_sp SET DEFAULT nextval('san_pham_id_sp_seq'::regclass);
 =   ALTER TABLE public.san_pham ALTER COLUMN id_sp DROP DEFAULT;
       public       postgres    false    199    198                       2604    25111    tinh_quan id_tinh    DEFAULT     h   ALTER TABLE ONLY tinh_quan ALTER COLUMN id_tinh SET DEFAULT nextval('tinh_quan_id_tinh_seq'::regclass);
 @   ALTER TABLE public.tinh_quan ALTER COLUMN id_tinh DROP DEFAULT;
       public       postgres    false    201    200                       2604    25112    users id_user    DEFAULT     `   ALTER TABLE ONLY users ALTER COLUMN id_user SET DEFAULT nextval('users_id_user_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN id_user DROP DEFAULT;
       public       postgres    false    203    202            �          0    25029    TP 
   TABLE DATA               &   COPY "TP" (id_tp, ten_tp) FROM stdin;
    public       postgres    false    185   U       �           0    0    TP_id_tp_seq    SEQUENCE SET     6   SELECT pg_catalog.setval('"TP_id_tp_seq"', 1, false);
            public       postgres    false    186            �          0    25037    bank 
   TABLE DATA               =   COPY bank (id_bank, namebank, codebank, id_user) FROM stdin;
    public       postgres    false    187   xW       �           0    0    bank_id_bank_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('bank_id_bank_seq', 1, false);
            public       postgres    false    188            �          0    25045 	   binh_luan 
   TABLE DATA               C   COPY binh_luan (id_sp, id_user, mo_ta, ngay_binh_luan) FROM stdin;
    public       postgres    false    189   �W       �          0    25051 	   giao_dich 
   TABLE DATA               a   COPY giao_dich (id_giao_dich, ngaygiaodich, trangthai, id_nguoi_mua, gia_tri, id_sp) FROM stdin;
    public       postgres    false    190   �W       �           0    0    giao_dich_id_giao_dich_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('giao_dich_id_giao_dich_seq', 1, false);
            public       postgres    false    191            �          0    25056    loai_sp 
   TABLE DATA               U   COPY loai_sp (id_loai_sp, ten_loai_sp, id_loai_sp_cha, tieu_de_thay_the) FROM stdin;
    public       postgres    false    192   �W       �           0    0    loai_sp_id_loai_sp_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('loai_sp_id_loai_sp_seq', 8, true);
            public       postgres    false    193            �          0    25064 	   loai_user 
   TABLE DATA               /   COPY loai_user (id_loai, ten_loai) FROM stdin;
    public       postgres    false    194   ^X       �           0    0    loai_user_id_loai_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('loai_user_id_loai_seq', 1, false);
            public       postgres    false    195            �          0    25072    nap_tien 
   TABLE DATA               L   COPY nap_tien (id_nap, phuongthuc, sotiennap, ngaynap, id_user) FROM stdin;
    public       postgres    false    196   {X       �           0    0    nap_tien_id_nap_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('nap_tien_id_nap_seq', 1, false);
            public       postgres    false    197            �          0    25080    san_pham 
   TABLE DATA               �   COPY san_pham (id_sp, ten_sp, gia, hinh, mota, ngaybatdau, ngayketthuc, id_user_cao_nhat, id_loai_sp, id_user_ban, mo_ta_tom_tat, tieu_de_thay_the, trang_thai, bid_amount, ngaydang) FROM stdin;
    public       postgres    false    198   �X       �           0    0    san_pham_id_sp_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('san_pham_id_sp_seq', 1, true);
            public       postgres    false    199            �          0    25088 	   tinh_quan 
   TABLE DATA               6   COPY tinh_quan (id_tinh, ten_tinh, id_tp) FROM stdin;
    public       postgres    false    200   �X       �           0    0    tinh_quan_id_tinh_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('tinh_quan_id_tinh_seq', 1, false);
            public       postgres    false    201            �          0    25096    users 
   TABLE DATA               �   COPY users (id_user, username, password, ho, ten, ngaydangky, email, sodienthoai, diachi, trangthai, sodu, id_loai, id_tinh) FROM stdin;
    public       postgres    false    202   �X       �           0    0    users_id_user_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('users_id_user_seq', 5, true);
            public       postgres    false    203                       2606    25114 
   TP TP_pkey 
   CONSTRAINT     H   ALTER TABLE ONLY "TP"
    ADD CONSTRAINT "TP_pkey" PRIMARY KEY (id_tp);
 8   ALTER TABLE ONLY public."TP" DROP CONSTRAINT "TP_pkey";
       public         postgres    false    185    185                       2606    25116    bank bank_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY bank
    ADD CONSTRAINT bank_pkey PRIMARY KEY (id_bank);
 8   ALTER TABLE ONLY public.bank DROP CONSTRAINT bank_pkey;
       public         postgres    false    187    187                       2606    25118    giao_dich giao_dich_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY giao_dich
    ADD CONSTRAINT giao_dich_pkey PRIMARY KEY (id_giao_dich);
 B   ALTER TABLE ONLY public.giao_dich DROP CONSTRAINT giao_dich_pkey;
       public         postgres    false    190    190                       2606    25120    loai_sp loai_sp_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY loai_sp
    ADD CONSTRAINT loai_sp_pkey PRIMARY KEY (id_loai_sp);
 >   ALTER TABLE ONLY public.loai_sp DROP CONSTRAINT loai_sp_pkey;
       public         postgres    false    192    192                        2606    25122    loai_user loai_user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY loai_user
    ADD CONSTRAINT loai_user_pkey PRIMARY KEY (id_loai);
 B   ALTER TABLE ONLY public.loai_user DROP CONSTRAINT loai_user_pkey;
       public         postgres    false    194    194            "           2606    25124    nap_tien nap_tien_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY nap_tien
    ADD CONSTRAINT nap_tien_pkey PRIMARY KEY (id_nap);
 @   ALTER TABLE ONLY public.nap_tien DROP CONSTRAINT nap_tien_pkey;
       public         postgres    false    196    196            $           2606    25126    san_pham san_pham_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY san_pham
    ADD CONSTRAINT san_pham_pkey PRIMARY KEY (id_sp);
 @   ALTER TABLE ONLY public.san_pham DROP CONSTRAINT san_pham_pkey;
       public         postgres    false    198    198            &           2606    25128    tinh_quan tinh_quan_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY tinh_quan
    ADD CONSTRAINT tinh_quan_pkey PRIMARY KEY (id_tinh);
 B   ALTER TABLE ONLY public.tinh_quan DROP CONSTRAINT tinh_quan_pkey;
       public         postgres    false    200    200            (           2606    25130    users users_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         postgres    false    202    202            )           2606    25131    bank bank_id_user_fkey    FK CONSTRAINT     l   ALTER TABLE ONLY bank
    ADD CONSTRAINT bank_id_user_fkey FOREIGN KEY (id_user) REFERENCES users(id_user);
 @   ALTER TABLE ONLY public.bank DROP CONSTRAINT bank_id_user_fkey;
       public       postgres    false    187    202    2088            *           2606    25136    giao_dich giao_dich_id_sp_fkey    FK CONSTRAINT     s   ALTER TABLE ONLY giao_dich
    ADD CONSTRAINT giao_dich_id_sp_fkey FOREIGN KEY (id_sp) REFERENCES san_pham(id_sp);
 H   ALTER TABLE ONLY public.giao_dich DROP CONSTRAINT giao_dich_id_sp_fkey;
       public       postgres    false    190    198    2084            +           2606    25141    nap_tien nap_tien_id_user_fkey    FK CONSTRAINT     t   ALTER TABLE ONLY nap_tien
    ADD CONSTRAINT nap_tien_id_user_fkey FOREIGN KEY (id_user) REFERENCES users(id_user);
 H   ALTER TABLE ONLY public.nap_tien DROP CONSTRAINT nap_tien_id_user_fkey;
       public       postgres    false    196    202    2088            ,           2606    25146 !   san_pham san_pham_id_loai_sp_fkey    FK CONSTRAINT        ALTER TABLE ONLY san_pham
    ADD CONSTRAINT san_pham_id_loai_sp_fkey FOREIGN KEY (id_loai_sp) REFERENCES loai_sp(id_loai_sp);
 K   ALTER TABLE ONLY public.san_pham DROP CONSTRAINT san_pham_id_loai_sp_fkey;
       public       postgres    false    192    2078    198            -           2606    25151 "   san_pham san_pham_id_user_ban_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY san_pham
    ADD CONSTRAINT san_pham_id_user_ban_fkey FOREIGN KEY (id_user_ban) REFERENCES users(id_user);
 L   ALTER TABLE ONLY public.san_pham DROP CONSTRAINT san_pham_id_user_ban_fkey;
       public       postgres    false    2088    198    202            .           2606    25156    tinh_quan tinh_quan_id_tp_fkey    FK CONSTRAINT     o   ALTER TABLE ONLY tinh_quan
    ADD CONSTRAINT tinh_quan_id_tp_fkey FOREIGN KEY (id_tp) REFERENCES "TP"(id_tp);
 H   ALTER TABLE ONLY public.tinh_quan DROP CONSTRAINT tinh_quan_id_tp_fkey;
       public       postgres    false    2072    185    200            /           2606    25161    users users_id_loai_fkey    FK CONSTRAINT     r   ALTER TABLE ONLY users
    ADD CONSTRAINT users_id_loai_fkey FOREIGN KEY (id_loai) REFERENCES loai_user(id_loai);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_loai_fkey;
       public       postgres    false    194    2080    202            0           2606    25166    users users_id_tinh_fkey    FK CONSTRAINT     r   ALTER TABLE ONLY users
    ADD CONSTRAINT users_id_tinh_fkey FOREIGN KEY (id_tinh) REFERENCES tinh_quan(id_tinh);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_tinh_fkey;
       public       postgres    false    202    200    2086            �   I  x�ES�j�P]�|�����굌]���IZa(ts1E%r1h�e�"�RdU���EISS�i7�"���I����H�י3gF˥�T�ׄe��2�iĊz.�U��K��5�*_��S�]�?Rq��L�G�r9��e��:���T���%i�1��uƖ�ׇU*ƚ-���~�B���;�g�P�-&Q݆%�Ƒ0�,%�gU~{� _��]C\:t�����ҥ��.����Xzmn]i�h�D�8l��m�d�m��E#Õm�kx�N#��`�%����*>��G�˃^��9,4�M"P�')�F��0d��s5��9:��Y�d���Ψ+�?��!z�����\��9֓��	;�j�#]G5��C:.�0dMw���Q����^[|tH�Sf�*�
�݄]� �{16Ov�Ξ��A���u��l��=�۪�6cORX�/�Ey�w��jK1c��
^a-���;�Y��������F�,�4G���c�������:1������Ӻ�;#Sʾw�n���t �E�z9�)iP�߁V���6Y�Q>��o�ɘ�鿚�1 2\������sf�=�g�      �      x������ � �      �      x������ � �      �      x������ � �      �      x�3�<2����
G&f>�ݞ�P�p�ZN�?.#���+J���P�4	s�d9����F i�����T(ϔ� 1�6�ڒ�����p�Ҽt�%�%w��T()J�Zpfg^����qqq ��9�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�]��
�@E�ٯH��}��V	�V6�UW�����1��ns�p��u��F��mk��a_��d��$vy�}|���&�)�;EN��ϔ��y�'�f� R��@U�'1�K�Ş����p�����C�����Qlx_ �V���OT���<=     