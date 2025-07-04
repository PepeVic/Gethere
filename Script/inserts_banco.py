from faker import Faker
import random
import psycopg2
from datetime import datetime, timedelta

# Conexão: ajuste com suas credenciais
DB_CONFIG = {
    'dbname': 'seu_banco',
    'user': 'seu_usuario',
    'password': 'sua_senha',
    'host': 'localhost',
    'port': 5432,
}

NUM_RECORDS = 50000

def connect_db():
    return psycopg2.connect(**DB_CONFIG)

def gen_cpf():
    return ''.join(str(random.randint(0, 9)) for _ in range(11))

def main():
    faker = Faker('pt_BR')
    conn = connect_db()
    cur = conn.cursor()
    
    # 1. usuarios.grupo_usuario
    for _ in range(NUM_RECORDS):
        nome = faker.unique.word().capitalize()
        cur.execute(
            "INSERT INTO usuarios.grupo_usuario(nome_grupo) VALUES (%s) ON CONFLICT DO NOTHING",
            (nome,)
        )
    conn.commit()
    cur.execute("SELECT id_grupo_usuario FROM usuarios.grupo_usuario")
    grupo_ids = [r[0] for r in cur.fetchall()]
    
    # 2. usuarios.usuario
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO usuarios.usuario(email, cpf, imagem_perfil, data_nascimento, nome_usuario) "
            "VALUES (%s, %s, %s, %s, %s)",
            (
                faker.unique.email(),
                gen_cpf(),
                None,
                faker.date_of_birth(minimum_age=18, maximum_age=80),
                faker.name()
            )
        )
    conn.commit()
    cur.execute("SELECT id_usuario FROM usuarios.usuario")
    user_ids = [r[0] for r in cur.fetchall()]
    
    # 3. usuarios.permissionamento
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO usuarios.permissionamento(id_usuario, id_grupo_usuario) "
            "VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (random.choice(user_ids), random.choice(grupo_ids))
        )
    conn.commit()
    
    # 4. empresas.empresa
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO empresas.empresa(id_responsavel, site, cnpj, nome_fantasia, email, telefone) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (
                random.choice(user_ids),
                faker.url(),
                ''.join(str(random.randint(0,9)) for _ in range(14)),
                faker.company(),
                faker.company_email(),
                faker.phone_number()
            )
        )
    conn.commit()
    cur.execute("SELECT id_empresa FROM empresas.empresa")
    emp_ids = [r[0] for r in cur.fetchall()]
    
    # 5. empresas.organizadores_empresa
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO empresas.organizadores_empresa(id_empresa, id_organizador) "
            "VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (random.choice(emp_ids), random.choice(user_ids))
        )
    conn.commit()
    
    # 6. eventos.endereco
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.endereco(logradouro, cidade, estado, cep, bairro, numero) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (
                faker.street_name(),
                faker.city(),
                faker.state(),
                faker.postcode(),
                faker.bairro(),
                str(random.randint(1, 1000))
            )
        )
    conn.commit()
    cur.execute("SELECT id_endereco FROM eventos.endereco")
    end_ids = [r[0] for r in cur.fetchall()]
    
    # 7. eventos.grupo
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.grupo(grupo, icone) VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (faker.unique.word().capitalize(), 'mdi-event')
        )
    conn.commit()
    cur.execute("SELECT id_grupo FROM eventos.grupo")
    grp_evt_ids = [r[0] for r in cur.fetchall()]
    
    # 8. eventos.evento
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.evento(id_empresa, id_grupo, site_evento, descricao_evento, nome_evento, capacidade_evento) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (
                random.choice(emp_ids),
                random.choice(grp_evt_ids),
                faker.url(),
                faker.sentence(nb_words=6),
                faker.sentence(nb_words=3),
                random.randint(10, 10000)
            )
        )
    conn.commit()
    cur.execute("SELECT id_evento FROM eventos.evento")
    evento_ids = [r[0] for r in cur.fetchall()]
    
    # 9. eventos.categoria
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.categoria(categoria) VALUES (%s) ON CONFLICT DO NOTHING",
            (faker.unique.word().capitalize(),)
        )
    conn.commit()
    cur.execute("SELECT id_categoria FROM eventos.categoria")
    cat_ids = [r[0] for r in cur.fetchall()]
    
    # 10. eventos.sede
    for _ in range(NUM_RECORDS):
        start = faker.date_time_between(start_date='-2y', end_date='now')
        end = start + timedelta(hours=random.randint(1,48))
        cur.execute(
            "INSERT INTO eventos.sede(id_evento, id_endereco, data_inicial, data_final) "
            "VALUES (%s, %s, %s, %s)",
            (random.choice(evento_ids), random.choice(end_ids), start, end)
        )
    conn.commit()
    cur.execute("SELECT id_sede FROM eventos.sede")
    sede_ids = [r[0] for r in cur.fetchall()]
    
    # 11. eventos."local"
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.\"local\"(id_endereco, tipo, capacidade, nome) "
            "VALUES (%s, %s, %s, %s)",
            (
                random.choice(end_ids),
                random.choice(['Salão','Prédio','Área Aberta','Teatro','Auditório','Museu']),
                random.randint(10,5000),
                faker.word().capitalize()
            )
        )
    conn.commit()
    cur.execute("SELECT id_local FROM eventos.\"local\"")
    local_ids = [r[0] for r in cur.fetchall()]
    
    # 12. eventos.atividade
    for _ in range(NUM_RECORDS):
        start = faker.date_time_between(start_date='-2y', end_date='now')
        end = start + timedelta(hours=random.randint(1,6))
        cur.execute(
            "INSERT INTO eventos.atividade(id_evento, nome_atividade, data_inicial, data_final, capacidade_participantes, descricao_atividade) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (
                random.choice(evento_ids),
                faker.sentence(nb_words=3),
                start, end,
                random.randint(5,500),
                faker.sentence(nb_words=6)
            )
        )
    conn.commit()
    cur.execute("SELECT id_atividade FROM eventos.atividade")
    ati_ids = [r[0] for r in cur.fetchall()]
    
    # 13. eventos.realizacao_atividade
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.realizacao_atividade(id_atividade, id_local) VALUES (%s, %s)",
            (random.choice(ati_ids), random.choice(local_ids))
        )
    conn.commit()
    cur.execute("SELECT id_realizacao_atividade FROM eventos.realizacao_atividade")
    real_ids = [r[0] for r in cur.fetchall()]
    
    # 14. eventos.atividade_categoria
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.atividade_categoria(id_atividade, id_categoria) VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (random.choice(ati_ids), random.choice(cat_ids))
        )
    conn.commit()
    
    # 15. eventos.presenca
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.presenca(id_participante, id_realizacao_atividade, data_inscricao, expirada) "
            "VALUES (%s, %s, %s, %s)",
            (
                random.choice(user_ids),
                random.choice(real_ids),
                faker.date_time_between(start_date='-2y', end_date='now'),
                random.choice([True, False])
            )
        )
    conn.commit()
    cur.execute("SELECT id_presenca FROM eventos.presenca")
    pres_ids = [r[0] for r in cur.fetchall()]
    
    # 16. eventos.apresentador_ramo
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.apresentador_ramo(ramo) VALUES (%s) ON CONFLICT DO NOTHING",
            (faker.unique.word().capitalize(),)
        )
    conn.commit()
    cur.execute("SELECT id_ramo FROM eventos.apresentador_ramo")
    ramo_ids = [r[0] for r in cur.fetchall()]
    
    # 17. eventos.apresentador
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.apresentador(id_apresentador, nome, id_ramo) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING",
            (
                random.choice(user_ids),
                faker.name(),
                random.choice(ramo_ids)
            )
        )
    conn.commit()
    
    # 18. eventos.atividade_apresentadores
    for _ in range(NUM_RECORDS):
        cur.execute(
            "INSERT INTO eventos.atividade_apresentadores(id_atividade, id_apresentador) "
            "VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (random.choice(ati_ids), random.choice(user_ids))
        )
    conn.commit()
    
    cur.close()
    conn.close()
    print("Geração de 50k registros para todas as tabelas concluída!")
    
if __name__ == "__main__":
    main()
