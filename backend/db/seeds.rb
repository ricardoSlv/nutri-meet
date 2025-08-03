# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

nutritionists = [
    {
        name: "João da Silva",
        email: "joao@gmail.com",
        website: "https://joao.com"
    },
    {
        name: "Maria Oliveira",
        email: "maria@gmail.com",
        website: "https://maria.com"
    },
    {
        name: "Pedro Santos",
        email: "pedro@gmail.com",
        website: "https://pedro.com"
    },
    {
        name: "Ana Costa",
        email: "ana.costa@gmail.com",
        website: "https://anacosta.com"
    }

]

locations = [
    {
        address: "Rua da Praia, 123",
        municipality: "Portimão",
        district: "Faro",
        zipcode: "123456"
    },
    {
        address: "Rua do Sobrado, 123",
        municipality: "Vila Verde",
        district: "Braga",
        zipcode: "123456"
    },
    {
        address: "Rua da Bairro, 123",
        municipality: "Barreiro",
        district: "Lisboa",
        zipcode: "123456"
    },
    {
        address: "Avenida dos Aliados, 100",
        municipality: "Porto",
        district: "Porto",
        zipcode: "400012"
    },
    {
        address: "Praça do Comércio, 50",
        municipality: "Lisboa",
        district: "Lisboa",
        zipcode: "110012"
    },
    {
        address: "Rua das Flores, 45",
        municipality: "Coimbra",
        district: "Coimbra",
        zipcode: "300045"
    },
    {
        address: "Avenida Central, 200",
        municipality: "Braga",
        district: "Braga",
        zipcode: "470020"
    },
    {
        address: "Rua do Sol, 77",
        municipality: "Funchal",
        district: "Madeira",
        zipcode: "900077"
    }
]

services = [
    {
        name: "Perda de peso",
        price: 100,
        nutritionist: "João da Silva",
        location: "Rua da Praia, 123"
    },
    {
        name: "Gestão de peso",
        price: 150,
        nutritionist: "João da Silva",
        location: "Rua do Sobrado, 123"
    },
    {
        name: "Nutrição Desportiva",
        price: 200,
        nutritionist: "Maria Oliveira",
        location: "Rua da Praia, 123"
    },
    {
        name: "Complementos Dietéticos",
        price: 300,
        nutritionist: "Maria Oliveira",
        location: "Rua da Bairro, 123"
    },
    {
        name: "Nutrição para crianças",
        price: 122.50,
        nutritionist: "Pedro Santos",
        location: "Rua da Praia, 123"
    },
    {
        name: "Nutrição para idosos",
        price: 144.50,
        nutritionist: "Pedro Santos",
        location: "Rua do Sobrado, 123"
    },
    {
        name: "Consulta de Nutrição Clínica",
        price: 120,
        nutritionist: "João da Silva",
        location: "Avenida Central, 200"
    },
    {
        name: "Plano Alimentar Personalizado",
        price: 180,
        nutritionist: "Pedro Santos",
        location: "Rua da Praia, 123"
    },
    {
        name: "Reeducação Alimentar",
        price: 110,
        nutritionist: "João da Silva",
        location: "Rua do Sobrado, 123"
    },
    {
        name: "Nutrição Vegetariana",
        price: 130,
        nutritionist: "Maria Oliveira",
        location: "Rua da Bairro, 123"
    },
    {
        name: "Avaliação Antropométrica",
        price: 90,
        nutritionist: "Pedro Santos",
        location: "Rua do Sol, 77"
    }


]

appointment_requests = [
    {
        name: "Emilia Pereira",
        email: "emilia@gmail.com",
        appointment_date: "2025-07-27 10:00:00",
        nutritionist: "João da Silva",
        service: "Perda de peso"
    },
    {
        name: "Paulo Proença",
        email: "paulo@gmail.com",
        appointment_date: "2025-07-28 10:00:00",
        nutritionist: "João da Silva",
        service: "Gestão de peso"
    },
    { name: "Carlos Costa",
        email: "carlos@gmail.com",
        appointment_date: "2025-07-27 10:00:00",
        nutritionist: "Maria Oliveira",
        service: "Nutrição Desportiva"
    },
    {
        name: "Ana Ribeiro",
        email: "ana@gmail.com",
        appointment_date: "2025-07-28 10:00:00",
        nutritionist: "Pedro Santos",
        service: "Complementos Dietéticos"
    },
    {
        name: "Beatriz Lopes",
        email: "beatriz.lopes@gmail.com",
        appointment_date: "2025-07-29 11:00:00",
        nutritionist: "Maria Oliveira",
        service: "Nutrição Vegetariana"
    },
    {
        name: "Ricardo Martins",
        email: "ricardo.martins@gmail.com",
        appointment_date: "2025-07-30 09:30:00",
        nutritionist: "Pedro Santos",
        service: "Avaliação Antropométrica"
    },
    {
        name: "Sofia Almeida",
        email: "sofia.almeida@gmail.com",
        appointment_date: "2025-07-29 15:00:00",
        nutritionist: "João da Silva",
        service: "Reeducação Alimentar"
    },
    {
        name: "Tiago Ferreira",
        email: "tiago.ferreira@gmail.com",
        appointment_date: "2025-07-31 14:00:00",
        nutritionist: "Maria Oliveira",
        service: "Nutrição Desportiva"
    },
    {
        name: "Helena Sousa",
        email: "helena.sousa@gmail.com",
        appointment_date: "2025-07-31 16:00:00",
        nutritionist: "Pedro Santos",
        service: "Complementos Dietéticos"
    },
    {
        name: "Gabriel Lima",
        email: "gabriel.lima@gmail.com",
        appointment_date: "2025-08-01 10:00:00",
        nutritionist: "Maria Oliveira",
        service: "Gestão de peso"
    },
    {
        name: "Patrícia Silva",
        email: "patricia.silva@gmail.com",
        appointment_date: "2025-08-01 10:00:00",
        nutritionist: "Maria Oliveira",
        service: "Nutrição Desportiva"
    },
    {
        name: "Rafael Costa",
        email: "rafael.costa@gmail.com",
        appointment_date: "2025-08-01 10:00:00",
        nutritionist: "Maria Oliveira",
        service: "Nutrição Vegetariana"
    }
]

accepted_appointment_requests = [
    {
        name: "Emilia Pereira",
        email: "emilia@gmail.com",
        appointment_date: "2025-08-01 10:00:00",
        nutritionist: "João da Silva",
        service: "Perda de peso"
    }
]

Appointment.delete_all
Service.delete_all
Nutritionist.delete_all
Location.delete_all


nutritionists.each do |nutritionist|
    Nutritionist.create!(nutritionist)
end

locations.each do |location|
    Location.create!(location)
end

services.each do |service|
    Service.create!(
        name: service[:name],
        price: service[:price],
        nutritionist_id: Nutritionist.find_by(name: service[:nutritionist]).id,
        location_id: Location.find_by(address: service[:location]).id
    )
end

appointment_requests.each do |appointment_request|
    Appointment.create!(
        guest_name: appointment_request[:name],
        guest_email: appointment_request[:email],
        datetime: appointment_request[:appointment_date],
        service_id: Service.find_by(name: appointment_request[:service]).id,
        nutritionist_id: Nutritionist.find_by(name: appointment_request[:nutritionist]).id)
end

accepted_appointment_requests.each do |accepted_appointment_request|
    Appointment.create!(
        guest_name: accepted_appointment_request[:name],
        guest_email: accepted_appointment_request[:email],
        datetime: accepted_appointment_request[:appointment_date],
        service_id: Service.find_by(name: accepted_appointment_request[:service]).id,
        nutritionist_id: Nutritionist.find_by(name: accepted_appointment_request[:nutritionist]).id,
        status: "accepted")
end
