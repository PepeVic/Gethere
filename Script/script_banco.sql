create schema if not exists usuarios;

create table if not exists usuarios.grupo_usuario(
	id_grupo_usuario smallserial primary key,
	nome_grupo varchar(255) not null unique
);

-- Inserindo grupos de usuários

insert into usuarios.grupo_usuario(nome_grupo)
values ('ADMINISTRADOR'), ('ORGANIZADOR'), ('RESPONSAVEL'), ('PARTICIPANTE');

create table if not exists usuarios.usuario(
	id_usuario bigserial primary key,
	email varchar(255) not null unique,
	cpf varchar(255) not null unique,
	imagem_perfil varchar(255),
	data_nascimento date not null,
	nome_usuario varchar(255) not null
);

-- Inserindo usuários

insert into usuarios.usuario(id_usuario, email, cpf, imagem_perfil, data_nascimento, nome_usuario)
values (1, 'antonio@gmail.com', '84490142048', null, '2001-11-15', 'Antonio Garcia'),
(2, 'matheus@gmail.com', '02893030017', null, '1998-09-02', 'Matheus Moreira'),
(3, 'pedro@gmail.com', '74149313075', null, '2002-09-12', 'Pedro Fonseca'),
(4, 'victor@gmail.com', '20467846006', null, '2003-06-30', 'Victor Ribeiro'),
(5, 'joao@gmail.com', '77179771090', null, '1995-03-12', 'João Carlos'),
(6, 'amanda@gmail.com', '85240052034', null, '1994-02-21', 'Amanda Silva'),
(7, 'neide@gmail.com', '25802180099', null, '1995-04-03', 'Neide Santos'),
(8, 'alex@gmail.com', '38711660066', null, '2001-03-25', 'Alex Marques'),
(9, 'anderson@gmail.com', '54713707082', null, '2002-05-03', 'Anderson Santana'),
(10, 'maike@gmail.com', '81409102017', null, '2003-06-21', 'Maike Pereira'),
(11, 'lidia@gmail.com', '84545856055', null, '2004-05-20', 'Lidia Marques'),
(12, 'roberto@gmail.com', '48546389071', null, '2001-03-01', 'Roberto Carvalho'),
(13, 'antonia@gmail.com', '07582078080', null, '1975-02-12', 'Antonia Moreira'),
(14, 'sheila@gmail.com', '16064869003', null, '1980-03-15', 'Sheila Siqueira'),
(15, 'marcos@gmail.com', '64966549051', null, '1984-10-11', 'Marcos Félix'),
(16, 'alessandro@gmail.com', '20686087070', null, '2000-09-04', 'Alessandro Almeida'),
(17, 'beatriz@gmail.com', '27931876075', null, '1954-02-01', 'Beatriz Lima'),
(18, 'fernando@gmail.com', '50198274017', null, '1976-04-30', 'Fernando Oliveira'),
(19, 'michael@gmail.com', '59795173081', null, '1965-05-02', 'Michael Filho'),
(20, 'lincoln@gmail.com', '31348788011', null, '1973-11-15', 'Lincoln Neto'),
(21, 'adriana@gmail.com', '64927499014', null, '1984-10-31', 'Adriana Silva'),
(22, 'carmem@gmail.com', '42146131047', null, '1993-01-01', 'Carmem Garcia'),
(23, 'luis@gmail.com', '65002948073', null, '2001-03-03', 'Luis Henrique');

create or replace function usuarios.atribuir_permissionamento_padrao() returns trigger as $$
	begin 
		insert into usuarios.permissionamento(id_usuario, id_grupo_usuario) select
		new.id_usuario, gu.id_grupo_usuario from usuarios.grupo_usuario gu where gu.nome_grupo = 'PARTICIPANTE';
	
		return null;
	end
$$ language plpgsql;

create trigger permissionamento_padrao after insert on usuarios.usuario
for each row execute function usuarios.atribuir_permissionamento_padrao();

create or replace function usuarios.atribuir_permissionamento_organizador() returns trigger as $$
	begin 
		insert into usuarios.permissionamento(id_usuario, id_grupo_usuario) select
		new.id_organizador as id_usuario, gu.id_grupo_usuario from usuarios.grupo_usuario gu where gu.nome_grupo = 'ORGANIZADOR'
		on conflict do nothing;
	
		return null;
	end
$$ language plpgsql;


create or replace function usuarios.atribuir_permissionamento_responsavel() returns trigger as $$
	begin 
		insert into usuarios.permissionamento(id_usuario, id_grupo_usuario) select
		new.id_responsavel as id_usuario, gu.id_grupo_usuario from usuarios.grupo_usuario gu where gu.nome_grupo = 'RESPONSAVEL'
		on conflict do nothing;
		return null;
	end
$$ language plpgsql;

-- O trigger de usuários irá preencher automaticamente a tabela de permissionamento

create table if not exists usuarios.permissionamento(
	id_usuario bigint not null,
	id_grupo_usuario smallint not null,
	primary key(id_usuario, id_grupo_usuario),
	constraint fk_usuario foreign key(id_usuario) references usuarios.usuario(id_usuario),
	constraint fk_grupo_usuario foreign key(id_grupo_usuario) references usuarios.grupo_usuario(id_grupo_usuario)
);

create schema if not exists empresas;

drop table if exists empresas.empresa cascade;

create table if not exists empresas.empresa(
	id_empresa bigserial primary key,
	id_responsavel bigint not null,
	site varchar(255),
	cnpj varchar(255) not null unique,
	nome_fantasia varchar(255) not null,
	email varchar(255),
	telefone varchar(255),
	constraint fk_usuario_responsavel foreign key(id_responsavel) references usuarios.usuario(id_usuario)
);


create trigger permissionamento_responsavel after insert on empresas.empresa
for each row execute function usuarios.atribuir_permissionamento_responsavel();

-- Inserindo empresas

insert into empresas.empresa(id_empresa, id_responsavel, site, cnpj, nome_fantasia, email, telefone)
values 
(1, 1, 'www.empresadeesportes.com.br', '03138085000167', 'Empresa de Esportes', 'empresadeesportes@gmail.com', null),
(2, 1, 'www.empresadetecnologia.com.br', '92608820000189', 'Empresa de Tecnologia', 'empresadetecnologia@gmail.com', null),
(3, 1, 'www.faculdadedeguarulhos.com.br', '66201577000170', 'Faculdade de Guarulhos', 'faculdadedeguarulhos@gmail.com', null),
(4, 2, 'www.empresadecanetas.com.br', '92810636000117', 'Empresa de Canetas', 'empresadecanetas@gmail.com', null),
(5, 2, 'www.laboratoriodequimica.com.br', '38347445000115', 'Laboratório de Química', 'laboratorioquimica@gmail.com', '2342-4212'),
(6, 2, 'www.empresadealimentacao.com.br', '28054461000166', 'Empresa de Alimentação', 'empresaalimentacao@gmail.com', null),
(7, 2, 'www.empresaderedes.com.br', '30939525000158', 'Empresa de Redes', 'empresaredes@gmail.com', null),
(8, 3, 'www.empresadecomunicao.com.br', '22052455000193', 'Empresa de Comunicação', 'empresadecomunicação@gmail.com', null),
(9, 3, 'www.empresadeproducao.com.br', '66947549000104', 'Empresa de Produção', 'empresadeproducao@gmail.com', '4343-1231'),
(10, 3, 'www.empresadetecidos.com.br', '34113077000190', 'Empresa de Tecidos', 'empresadetecidos@gmail.com', '3232-3232'),
(11, 3, 'www.empresadealmofadas.com.br', '37581497000199', 'Empresa de Almofadas', 'empresadealmofadas@gmail.com', '4343-4321'),
(12, 1, 'www.empresademusica.com.br', '07752576000154', 'Empresa de Música', 'empresademusica@gmail.com', null),
(13, 2, 'www.faculdadedavilamariana.com.br', '99070875000127', 'Faculdade da Vila Mariana', 'faculdadedavilamariana@gmail.com', null),
(14, 2, 'www.empresadetenis.com.br', '68028476000174', 'Empresa de Tênis', 'empresadetenis@gmail.com', null),
(15, 1, 'www.empresadeprogramacao.com.br', '15065245000174', 'Empresa de Programação', 'empresadeprogramacao@gmail.com', null),
(16, 2, 'www.empresadefutebol.com.br', '20242791000173', 'Empresa de Futebol', 'empresadefutebol@gmail.com', null),
(17, 3, 'www.empresadeblogueiras.com.br', '64542535000177', 'Empresa de Blogueiras', 'empresadeblogueiras@gmail.com', null),
(18, 1, 'www.empresadeautomobolismo.com.br', '51752491000168', 'Empresa de Automobolismo', 'empresadeautomobolismo@gmail.com', null),
(19, 2, 'www.empresademoveis.com.br', '70269029000159', 'Empresa de Móveis', 'empresademoveis@gmail.com', null),
(20, 1, 'www.empresadefilmes.com.br', '04517475000100', 'Empresa de Filmes', 'empresadefilmes@gmail.com', null);


create table if not exists empresas.organizadores_empresa(
	id_empresa bigint not null,
	id_organizador bigint not null,
	primary key(id_empresa, id_organizador),
	constraint fk_empresa foreign key(id_empresa) references empresas.empresa(id_empresa),
	constraint fk_usuario_organizador foreign key(id_organizador) references usuarios.usuario(id_usuario)
);

create trigger permissionamento_organizador after insert on empresas.organizadores_empresa
for each row execute function usuarios.atribuir_permissionamento_organizador();

-- Relacionando empresas com organizadores

insert into empresas.organizadores_empresa(id_empresa, id_organizador)
values (1, 4),
(2, 5),
(3, 6),
(4, 7),
(5, 8),
(6, 9),
(7, 10),
(8, 11),
(9, 12),
(10, 13),
(11, 14),
(12, 15),
(13, 16),
(14, 17),
(15, 18),
(16, 19),
(17, 20),
(18, 21),
(19, 22),
(20, 23);

create schema if not exists eventos;

create table if not exists eventos.endereco(
	id_endereco bigserial primary key,
	logradouro varchar(255) not null,
	cidade varchar(255) not null,
	estado varchar(255) not null,
	cep varchar(255) not null,
	bairro varchar(255) not null,
	numero varchar(10)
);


-- Cadastrando endereços

insert into eventos.endereco(id_endereco, logradouro, cidade, estado, cep, bairro, numero)
values
(1, 'Rua das Flores', 'Guarulhos', 'São Paulo', '07178390', 'Vila Carmela II', '90'),
(2, 'Avenida Paulista', 'São Paulo', 'São Paulo', '01310200', 'Bela Vista', '1578'),
(3, 'Avenida Francisco Matarazzo', 'São Paulo', 'São Paulo', '05001200', 'Água Branca', '1705'),
(4, 'Rua Jasmim Verde', 'Manaus', 'Amazonas', '69044026', 'Planalto', '2'),
(5, 'Rua Joaquim Moreira dos Santos', 'Barueri', 'São Paulo', '06409004', 'Jardim Califórnia', '23'),
(6, 'Rua Corinthians', 'Rio Branco', 'Acre', '69908084', 'Belo Jardim II', '2332'),
(7, 'Viela Lincoln 1', 'Goiânia', 'Góias', '74710302', 'Jardim Novo Mundo', '51'),
(8, 'Rua Ana Maria', 'Carapicuíba', 'São Paulo', '06386590', 'Jardim Ana Maria', '412'),
(9, 'Rua dos Ciclopes', 'São Paulo', 'São Paulo', '04855160', 'Jardim Itajai', '8993'),
(10, 'Rua Lindóia', 'Manaus', 'Amazonas', '69084472', 'Zumbi dos Palmares', '1'),
(11, 'Rua Tulipa', 'Itacoatiara', 'Amazonas', '69104826', 'Jardim Adriana', '32'),
(12, 'Rua do Boto', 'Juiz de Fora', 'Minas Gerais', '36060660', 'Linhares', '500'),
(13, 'Rua Oscar Freire', 'Santo Antônio de Jesus', 'Bahia', '44441206', 'São Benedito', '403'),
(14, 'Rua Antonio Pereira de Lima', 'Cajamar', 'São Paulo', '07750795', 'Centro', '344'),
(15, 'Avenida Nova Iorque', 'Boa Vista', 'Roraima', '69310010', 'Aeroporto', '4953'),
(16, 'Rua Flor-de-cravo', 'Belo Horizonte', 'Minas Gerais', '30865370', 'Jardim Filadélfia', '241'),
(17, 'Rua Karl Marx', 'Maracanaú', 'Ceará', '61933150', 'Pajuçara', 'S/N'),
(18, 'Praça do Detran', 'Vitória de Santo Antão', 'Pernambuco', '55610498', 'Cajá', '232'),
(19, 'Rua Lisboa', 'Barreiras', 'Bahia', '47813682', 'Santo Antônio', '30'),
(20, 'Rua Barbera', 'São Roque', 'São Paulo', '18136880', 'Vinhedos III', '2480');


create table if not exists eventos.grupo(
	id_grupo serial primary key,
 	grupo varchar(255) unique,
 	icone varchar(255) default null
);

-- Inserindo grupos dos eventos

INSERT INTO eventos.grupo (id_grupo, grupo, icone) values
(1, 'Tecnologia', 'mdi-event'),
(2, 'Música', 'mdi-event'),
(3, 'Esporte', 'mdi-event'),
(4, 'Literatura', 'mdi-event'),
(5, 'Economia', 'mdi-event'),
(6, 'Culinária', 'mdi-event'),
(7, 'Empreendedorismo', 'mdi-event'),
(8, 'Cultura', 'mdi-event'),
(9, 'Audiovisual', 'mdi-event'),
(10, 'Automobilismo', 'mdi-event'),
(11, 'Têxtil', 'mdi-event'),
(12, 'Legislação', 'mdi-event'),
(13, 'Política', 'mdi-event'),
(14, 'Medicina', 'mdi-event'),
(15, 'Engenharia', 'mdi-event'),
(16, 'Veteriária', 'mdi-event'),
(17, 'Robótica', 'mdi-event'),
(18, 'Filosofia', 'mdi-event'),
(19, 'História', 'mdi-event'),
(20, 'Comunicação', 'mdi-event');


create table if not exists eventos.evento(
	id_evento bigserial primary key,
	id_empresa bigint not null,
	id_grupo bigint not null,
	site_evento varchar(255),
	descricao_evento varchar(255),
	nome_evento varchar(255) not null,
	capacidade_evento bigint,
	expirado boolean default false,
	timestamp_criacao timestamp default now(),
	constraint fk_empresa foreign key(id_empresa) references empresas.empresa(id_empresa),
	constraint fk_grupo foreign key(id_grupo) references eventos.grupo(id_grupo)
);

-- Inserindo eventos

INSERT INTO eventos.evento (id_evento, id_empresa, id_grupo, site_evento, descricao_evento, nome_evento, capacidade_evento, expirado) values
(1,2,1,'www.workshopsprogramacao.com.br','Aprenda a progrmar por meio de workshops!','Workshops de programação',500, false),
(2,12,2,'www.comocriarmusica.com.br','Aprenda compor música!','Composição musical',30, false),
(3,12,2,'www.queroversanguerap.com.br','Acompanhe as melhores batalhas de raps nacionais!','Batalhas de rap nacionais',200, false),
(4,16,3,'www.brasileirao2021.com.br','Assista aos jogos do brasileirão!','Brasileirão 2021',100000, false),
(5,17,4,'www.leituraemgrupo.com.br','Vamos ler livros em grupo!','Leitura em grupo',40, false),
(6,6,6,'www.receitassimples.com.br','Faça receitas simples e gostosas!','Receitas Simples',60, false),
(7,13,5,'www.comeceaeconomizar.com.br','Comece a economizar no dia a dia!','Como economizar no dia a dia',400, false),
(8,17,8,'www.arte.com.br','Venha ver as nossas exposições de arte!','Exposição de artes',600, false),
(9,8,19,'www.historiatv.com.br','Venha ver a história da comunicação brasileira!','História da Comunicação Brasileira',4000, false),
(10,3,7,'www.lucrenacrise.com.br','Comece a ganhar dinheiro mesmo em época de crise!','Lucre na crise',700, false),
(11,13,5,'www.vidadeadulto.com.br','Venha aprender a resolver problemas da vida adulta!','Resolução de problemas da vida adulta',1200, false),
(12,3,15,'www.fisicasimples.com.br','Entenda como funcionam os fenômenos físicos!','Física descomplicada',280, false),
(13,1,3,'www.voleisub20.com.br','Acompanhe o dia a dia da nossa seleção sub-20 de vôlei!','Comemoração campeão sub-20',4000, false),
(14,9,20,'www.analisefilmes.com.br','Discuta filmes com outros amantes da sétima arte!','Discussão de filmes',50, false),
(15,13,19,'www.curiosidadeshistoricas.com.br','Conheça um pouco mais da nossa história!','História no séc XV',700, false),
(16,3,19,'www.ditaduras.com.br','Descubra como foram os governos ditatoriais!','Governos Ditatoriais',300, false),
(17,17,20,'www.exporealityshow.com.br', 'Uma exposição dos reality shows das blogueiras agora perto de você!', 'Expo Reality Show Blogueirinhas', 10000, false),
(18, 2, 7, 'www.empreendernaprogramacao.com.br', 'Aprenda a criar sua própria startup e as dificuldades envolvidas', 'Encontro de Startups', 1000, false),
(19, 13, 14, 'www.semanadamedicina.com.br', 'Uma semana voltada para discutir os assuntos mais recentes na área da medicina', 'Semana da Medicina', 100, false),
(20, 18, 10, 'www.automoblismovintage.com.br', 'Evento para apreciar os melhores momentos do automobolismo da década de 30', 'Automobolismo Vintage', 5000, false);


create table if not exists eventos.categoria(
	id_categoria serial primary key,
	categoria varchar(255) unique
);

-- Inserindo categorias de atividades
insert into eventos.categoria(id_categoria, categoria)
values 
(1, 'Arduino'),
(2, 'IoT'),
(3, 'Rap'),
(4, 'Brasileirão 2021'),
(5, 'Leitura'),
(6, 'Machado de Assis'),
(7, 'Tutorial'),
(8, 'Culinária de Rotina'),
(9, 'Financeiro'),
(10, 'Maria Martins'),
(11, 'Python 2'),
(12, 'Televisão Brasileira'),
(13, 'Crise'),
(14, 'Imposto de Renda'),
(15, 'Mecânica'),
(16, 'Vôlei Sub-20'),
(17, 'Cinema Brasileiro'),
(18, 'Grandes Navegações'),
(19, 'Chile'),
(20, 'Java'),
(21, 'Culinária de Empreendedorismo');

create table if not exists eventos.sede(
	id_sede bigserial primary key,
	id_evento bigint not null,
	id_endereco bigint not null,
	data_inicial timestamp not null,
	data_final timestamp not null,
	constraint fk_evento foreign key(id_evento) references eventos.evento(id_evento),
	constraint fk_endereco foreign key(id_endereco) references eventos.endereco(id_endereco)
);

-- Linkando eventos às suas sedes
INSERT INTO eventos.sede (id_sede, id_evento, id_endereco, data_inicial, data_final) 
VALUES (1,1,1, '2021-11-16 10:00:00', '2021-11-17 12:00:00'),
(2,2,8,'2021-10-24 10:00:00', '2021-10-25 17:00:00'),
(3,3,4,'2022-03-04 20:00:00', '2022-03-05 23:30:00'),
(4,4,3,'2021-11-17 20:30:00', '2021-11-18 22:30:00'),
(5,5,5,'2021-12-25 12:00:00', '2021-12-26 16:45:00'),
(6,6,6,'2020-08-11 10:00:00', '2020-08-12 13:00:00'),
(7,7,7,'2021-11-17 08:00:00', '2021-11-18 09:00:00'),
(8,8,2,'2021-08-27 10:00:00', '2022-01-31 23:00:00'),
(9,9,9,'2020-07-23 13:00:00', '2020-07-24 15:00:00'),
(10,10,10,'2021-11-21 10:00:00', '2021-11-22 13:00:00'),
(11,11,11,'2021-09-17 09:00:00', '2021-09-18 10:00:00'),
(12,12,12,'2021-03-12 10:00:00', '2021-03-13 11:00:00'),
(13,13,13,'2021-05-12 13:00:00', '2021-05-13 14:00:00'),
(14,14,14,'2021-06-26 19:00:00', '2021-06-27 20:00:00'),
(15,15,15,'2017-07-15 11:00:00', '2017-07-15 13:00:00'),
(16,16,16,'2019-01-01 10:00:00', '2019-01-02 12:00:00'),
(17,17,17,'2021-11-29 18:30:00', '2021-11-30 18:30:00'),
(18,18,18,'2021-05-15 13:00:00', '2021-05-16 14:00:00'),
(19,19,19,'2021-10-25 16:00:00', '2021-05-26 18:00:00'),
(20,20,20,'2021-12-11 13:00:00', '2021-12-12 14:00:00');

create table if not exists eventos."local"(
	id_local bigserial primary key,
	id_endereco bigint not null,
	tipo varchar(255) not null,
	capacidade bigint,
	nome varchar(255) not null,
	constraint fk_endereco foreign key(id_endereco) references eventos.endereco(id_endereco)
);

-- Inserindo locais

insert into eventos."local"(id_local, id_endereco, tipo, capacidade, nome)
values
(1, 1, 'Salão', 20, 'Salão de Festas'),
(2, 2, 'Museu', 200, 'MASP'),
(3, 3, 'Estádio de Futebol', 5000, 'Setor A'),
(4, 3, 'Estádio de Futebol', 5000, 'Setor B'),
(5, 4, 'Área Aberta', 10000, 'Campo Aberto'),
(6, 5, 'Teatro', 1000, 'Teatro Municipal'),
(7, 6, 'Salão', 100, 'Salão de Reuniões'),
(8, 8, 'Prédio', 20, 'Sala 20A'),
(9, 9, 'Prédio', 30, 'Sala 3B'),
(10, 10, 'Área Aberta', 20000, 'Campo Aberto'),
(11, 11, 'Cinema', 100, 'Sala 10'),
(12, 11, 'Cinema', 100, 'Sala 9'),
(13, 12, 'Auditório', 200, 'Auditório Principal'),
(14, 12, 'Auditório', 100, 'Auditório Secundário'),
(15, 13, 'Aeroporto', 10000, 'Campo Aberto'),
(16, 14, 'Prédio', 35, 'Sala 1'),
(17, 15, 'Auditório', 5000, 'Salão de Discussões'),
(18, 16, 'Prédio', 25, 'Sala 205'),
(19, 17, 'Auditório', 100, 'Sala Principal'),
(20, 20, 'Prédio', 15, 'Sala 2B');


create table if not exists eventos.atividade(
	id_atividade bigserial primary key,
	id_evento bigint not null,
	nome_atividade varchar(255) not null,
	data_inicial timestamp not null,
	data_final timestamp not null,
	capacidade_participantes bigint,
	descricao_atividade varchar(255),
	constraint fk_evento foreign key(id_evento) references eventos.evento(id_evento)
);

-- Inserindo atividades dentro de eventos

INSERT INTO eventos.atividade (id_atividade, id_evento, nome_atividade, data_inicial, data_final, capacidade_participantes, descricao_atividade) values
(1,1,'Workshop de arduino', '2021-11-16 10:00:00', '2021-11-16 12:00:00', 10, 'Aprenda a programar em arduino'),
(2,3,'Batalha de rap', '2022-03-04 20:00:00', '2022-03-04 23:30:00', 100, 'Venha acompanhar os novos nomes do rap nacional'),
(3,4,'Palmeiras X São Paulo', '2021-11-17 20:30:00', '2021-11-17 22:30:00', 45000, 'Assista a 33ª rodada do brasileirão Palmeiras e São Paulo'),
(4,5,'Leitura em grupo: Memórias Póstumas de Brás Cubas', '2021-12-25 12:00:00', '2021-12-25 16:45:00', 20, 'Venha ler com a gente o livro Memórias Póstumas de Brás Cubas!'),
(5,2,'Como criar sua primeira música', '2021-10-24 10:00:00', '2021-10-24 17:00:00', 15, 'Aprenda a compor a sua primeira música'),
(6,6,'Aprenda a fazer um bolo simples', '2020-08-11 10:00:00', '2020-08-11 13:00:00', 50, 'Venha conhecer a receita de um bolo simples para sua família'),
(7,7,'Como economizar gasolina', '2021-11-17 08:00:00', '2021-11-17 09:00:00', 200, 'Em época de crise, toda economia é bem vinda! Venha descobrir as melhores técnicas para reduzir o consumo de gasolina do seu carro'),
(8,8,'Exposição Maria Martins', '2021-08-27 10:00:00', '2022-01-30 23:00:00', 200, 'A mostra de Maria Martins integra o biênio da programação do MASP dedicado às Histórias brasileiras'),
(9,2,'Workshop de Python 2', '2018-05-12 14:00:00', '2018-05-12 18:00:00', 250, 'Aprenda a programar em Python'),
(10,9,'História da televisão brasileira', '2020-07-23 13:00:00', '2020-07-23 15:00:00', 2000, 'Venha descobrir a história da nossa televisão brasileira'),
(11,10,'Como abrir uma empresa em época de crise', '2021-11-21 10:00:00', '2021-11-21 13:00:00', 350, 'Como contornar o período de recessão criando uma empresa? Venha e descubra!'),
(12,11,'Como declarar imposto de renda', '2021-09-17 09:00:00', '2021-09-17 10:00:00', 550, 'Aprenda a declarar seu imposto de renda e não seja dependente de outra pessoa'),
(13,12,'Entenda o funcionamento de um pêndulo', '2021-03-12 10:00:00', '2021-03-12 11:00:00', 140, 'Com auxílio de um professor de física, entenda como funciona um pêndulo!'),
(14,13,'Encontro da seleção de volei sub-20 brasileira', '2021-05-12 13:00:00', '2021-05-12 14:00:00', 4000, 'Vamos mostrar o nosso apoio a seleção sub-20 de vôlei!!!'),
(15,14,'Análise de Bacurau', '2021-06-26 19:00:00', '2021-06-26 20:00:00', 25, 'Venha discutir sobre o filme Bacurau com os amantes da sétima arte'),
(16,15,'Como eram as caravanas na epóca das Grandes Navegações', '2017-07-15 11:00:00', '2017-07-15 13:00:00', 350, 'Uma breve história sobre as Grandes Navegações como também algumas curiosidades sobre essa época'),
(17,16,'Situação política do Chile na época de Pinochet', '2019-01-01 10:00:00', '2019-01-01 12:00:00', 150, 'Descubra como foi o governo de Augusto Pinochet'),
(18,4,'Flamengo x Corinthians', '2021-11-20 18:30:00', '2021-11-20 20:30:00', 45000, 'Assista a 33ª rodada do brasileirão Flamengo e Corinthians'),
(19,10,'Como fazer brownies para vender', '2021-07-15 11:45:00', '2021-07-15 13:45:00', 120, 'Aprendar a fazer brownies perfeitos para vender!'),
(20,1,'Workshop de Java', '2021-12-19 17:30:00', '2021-12-19 20:30:00', 250, 'Aprenda a programar em Java');

create table if not exists eventos.realizacao_atividade(
	id_realizacao_atividade bigserial primary key,
	id_atividade bigint not null,
	id_local bigint not null,
	constraint fk_atividade foreign key(id_atividade) references eventos.atividade(id_atividade),
	constraint fk_local foreign key(id_local) references eventos."local"(id_local)
);

-- Linkando atividades aos locais
insert into eventos.realizacao_atividade(id_realizacao_atividade, id_atividade, id_local)
values 
(1, 1, 1),
(2, 5, 8),
(3, 2, 5),
(4, 3, 3),
(5, 3, 4),
(6, 4, 6),
(7, 6, 7),
(8, 7, 8),
(9, 8, 2),
(10, 10, 9),
(11, 11, 10),
(12, 12, 11),
(13, 13, 13),
(14, 13, 14),
(15, 14, 15),
(16, 15, 16),
(17, 16, 17),
(18, 17, 18),
(19, 18, 3),
(20, 18, 4);


create table if not exists eventos.atividade_categoria(
	id_atividade bigint not null,
	id_categoria int not null,
	primary key(id_atividade, id_categoria),
	constraint fk_atividade foreign key(id_atividade) references eventos.atividade(id_atividade),
	constraint fk_categoria foreign key(id_categoria) references eventos.categoria(id_categoria)
);

-- Linkando categorias com atividades
insert into eventos.atividade_categoria(id_atividade, id_categoria)
values (1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(4, 6),
(5, 7),
(6, 8),
(7, 9),
(8, 10),
(9, 11),
(10, 12),
(11, 13),
(12, 14),
(13, 15),
(14, 16),
(15, 17),
(16, 18),
(17, 19),
(18, 4),
(19, 21),
(20, 20);

create table if not exists eventos.presenca(
	id_presenca bigserial primary key,
	id_participante bigint not null,
	id_realizacao_atividade bigint not null,
	data_inscricao timestamp default now(),
	expirada boolean default false,
	constraint fk_usuario_participante foreign key(id_participante) references usuarios.usuario(id_usuario),
	constraint fk_realizacao_atividade foreign key(id_realizacao_atividade) references eventos.realizacao_atividade(id_realizacao_atividade)
);

-- Linkando usuários às presenças nas realizações de atividade

INSERT INTO eventos.presenca (id_presenca, id_participante, id_realizacao_atividade, data_inscricao, expirada)
VALUES (1,1,1,'2021-11-15 13:00:00', false),
(2,2,2,'2021-10-23 10:00:00', false),
(3,3,3,'2022-03-04 12:00:00', false),
(4,4,4,'2021-11-16 10:30:00', false),
(5,5,5,'2021-11-17 12:40:00', false),
(6,6,6,'2021-12-24 15:00:00', false),
(7,7,7,'2020-08-10 12:01:00', false),
(8,8,8,'2021-11-16 17:00:00', false),
(9,9,9,'2021-08-26 19:00:00', false),
(10,10,10,'2020-07-22 21:00:00', false),
(11,11,11,'2021-11-20 17:30:00', false),
(12,12,12,'2021-09-17 16:00:00', false),
(13,13,13,'2021-03-11 17:00:00', false),
(14,14,14,'2021-03-12 08:00:00', false),
(15,15,15,'2021-05-11 16:00:00', false),
(16,16,16,'2021-06-25 17:00:00', false),
(17,17,17,'2017-07-14 18:00:00', false),
(18,18,18,'2019-01-01 06:00:00', false),
(19,19,19,'2021-11-19 17:32:00', false),
(20,20,20,'2021-11-20 14:30:00', false);

create extension if not exists "uuid-ossp";

create table if not exists eventos.certificado(
	id_certificado bigserial primary key,
	id_presenca bigint not null,
	hash_certificado uuid not null unique default uuid_generate_v4(),
	constraint fk_presenca foreign key(id_presenca) references eventos.presenca(id_presenca)
);

-- Não serão inseridos dados nessa tabela visto que o insert acontece automaticamente após a execução da function eventos.verificar_certificado()

create table if not exists eventos.apresentador_ramo(
	id_ramo serial primary key,
	ramo varchar(255) not null unique
);

-- Inserindo ramos dos palestrantes
insert into eventos.apresentador_ramo(id_ramo, ramo) values
(1, 'Futebol'),
(2, 'Música'),
(3, 'Tecnologia'),
(4, 'Robótica'),
(5, 'Programação'),
(6, 'Medicina'),
(7, 'Culinária'),
(8, 'Empreendedorismo'),
(9, 'Literatura'),
(10, 'Automobolismo'),
(11, 'Têxtil'),
(12, 'Cultura'),
(13, 'Economia'),
(14, 'Direito'),
(15, 'Engenharia'),
(16, 'Legislação'),
(17, 'Política'),
(18, 'Arquitetura'),
(19, 'Artes'),
(20, 'Veterinária');

create table if not exists eventos.apresentador(
	id_apresentador bigint primary key,
	nome varchar(255) not null,
	id_ramo int not null,
	constraint fk_ramo foreign key(id_ramo) references eventos.apresentador_ramo(id_ramo)
);

-- Inserindo apresentadores
insert into eventos.apresentador(id_apresentador, nome, id_ramo)
values
(1, 'Betão', 1),
(2, 'Marta', 1),
(3, 'Anitta', 2),
(4, 'Valesca Popozuda', 2),
(5, 'Bill Gates', 3),
(6, 'Mark Zuckerberg', 3),
(7, 'Glayson Murollo', 5),
(8, 'Gustavo Guanabara', 5),
(9, 'Paulo Coelho', 9),
(10, 'Emerson Fittipaldi', 10),
(11, 'Wagner Moura', 12),
(12, 'Seu Jorge', 12),
(13, 'Sérgio Moro', 14),
(14, 'Celso Rossoumano', 16),
(15, 'Primo Rico', 8),
(16, 'Felipe Neto', 8),
(17, 'Romero Britto', 19),
(18, 'Luísa Mel', 20),
(19, 'Marcelo Odebrechet', 15),
(20, 'Palmirinha', 7);

create table if not exists eventos.atividade_apresentadores(
	id_atividade bigint not null,
	id_apresentador bigint not null,
	primary key(id_atividade, id_apresentador),
	constraint fk_atividade foreign key(id_atividade) references eventos.atividade(id_atividade),
	constraint fk_apresentador foreign key(id_apresentador) references eventos.apresentador(id_apresentador)
);

-- Linkando os apresentadores às atividades
insert into eventos.atividade_apresentadores(id_atividade, id_apresentador) values 
(1, 6),
(2, 4),
(2, 3),
(3, 2),
(4, 9),
(5, 3),
(6, 20),
(7, 15),
(8, 11),
(9, 7),
(10, 11),
(11, 15),
(12, 13),
(13, 8),
(14, 16),
(15, 12),
(16, 13),
(17, 14),
(18, 1),
(19, 20),
(20, 8);

create or replace view eventos.fila_certificados as
select p.id_presenca from eventos.presenca p
	inner join eventos.realizacao_atividade ra on ra.id_realizacao_atividade = p.id_realizacao_atividade
	inner join eventos.atividade a on a.id_atividade = ra.id_atividade
where p.expirada is false and a.data_final <= current_timestamp;

create or replace function eventos.verificar_certificado() returns void as $$
	begin
		insert into eventos.certificado(id_presenca) select id_presenca from eventos.fila_certificados;
	
		update eventos.presenca p set expirada = true from eventos.fila_certificados fc where fc.id_presenca = p.id_presenca;
	end
$$ language plpgsql;

create schema if not exists frontend;

create or replace view frontend.grupos_disponiveis as 
select * from eventos.grupo g;

create or replace function eventos.maior_data_evento(id_evento bigint) returns timestamp as $$
	declare maior_data timestamp;
	begin 
		select max(data_final) into maior_data from eventos.sede s where s.id_evento = id_evento group by id_evento;
	
		return maior_data;
	end
$$ language plpgsql;

create or replace view eventos.fila_eventos as 
	select id_evento from eventos.evento e 
where eventos.maior_data_evento(e.id_evento) <= current_timestamp 
and e.expirado is false;

create or replace function eventos.verificar_evento() returns void as $$
	begin 
		update eventos e set expirado = true from eventos.fila_eventos fe where e.id_evento = fe.id_evento;
	end
$$ language plpgsql;

create or replace view frontend.eventos_disponiveis as
select 
e.id_evento,
e.nome_evento,
e.descricao_evento,
e.site_evento,
e.capacidade_evento,
g.id_grupo,
g.grupo,
e.timestamp_criacao
from eventos.evento e
	inner join eventos.grupo g on e.id_grupo = g.id_grupo
where e.expirado is false;

CREATE OR REPLACE FUNCTION usuarios.recuperar_permissoes(in_id_usuario bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
	declare result_json jsonb;
	begin 
		select jsonb_agg(gp.nome_grupo) into result_json
		from usuarios.permissionamento p 
			inner join usuarios.grupo_usuario gp on p.id_grupo_usuario = gp.id_grupo_usuario 
		where p.id_usuario = in_id_usuario group by p.id_usuario;
	
		return result_json;
	end
$function$
;


create or replace view usuarios.usuarios_disponiveis 
as select
u.id_usuario, 
u.email,
u.imagem_perfil,
u.data_nascimento,
u.cpf,
usuarios.recuperar_permissoes(u.id_usuario) as permissoes
from usuarios.usuario u;

create or replace view frontend.validacao_certificado
as select
c.id_certificado,
c.hash_certificado,
a.nome_atividade,
a.data_inicial,
a.data_final,
p.data_inscricao,
u.email,
u.nome_usuario,
u.data_nascimento 
from eventos.certificado c
inner join eventos.presenca p on c.id_presenca = p.id_presenca
inner join eventos.realizacao_atividade ra on p.id_realizacao_atividade = p.id_realizacao_atividade
inner join eventos.atividade a on a.id_atividade = ra.id_atividade
inner join usuarios.usuario u on u.id_usuario = p.id_participante;
