Scopul proiectului
ExpertEat este un sistem expert care oferă recomandări personalizate de restaurante, în funcție de preferințele utilizatorului legate de tipul de mâncare, buget și locație. 
Scopul aplicației este să simplifice procesul de alegere a unui restaurant potrivit, oferind sugestii rapide și vizuale pe baza criteriilor introduse de utilizator.

Descrierea funcționalităților principale
1. Baza de cunoștințe
Am folosit un fișier JSON (restaurants.json) care conține lista restaurantelor, cu detalii despre tipul de mâncare, buget, locație, imagini și link-uri către paginile oficiale.
Pentru restaurantele cu mai multe locații, am inclus liste de locații și imagini multiple corespunzătoare fiecărei locații.
3. Motorul de inferență (algoritmul de recomandare)
Am implementat o funcție filter_restaurants() în rules.py, care evaluează fiecare restaurant în funcție de preferințele utilizatorului.
Motorul nostru folosește o abordare Forward Chaining: pornește de la preferințele introduse și parcurge baza de cunoștințe pentru a găsi restaurantele care corespund cel mai bine criteriilor.
Sistemul acordă un scor pentru fiecare restaurant și returnează o listă ordonată descrescător.
5. Interfața utilizator
Am dezvoltat o aplicație web folosind Flask pentru backend și HTML, CSS, JavaScript pentru frontend. Utilizatorul introduce preferințele într-un formular, iar rezultatele sunt afișate în aceeași pagină, cu imagini reprezentative pentru fiecare restaurant și link-uri directe către paginile oficiale ale acestora.
 Am adăugat un background personalizat și stiluri vizuale pentru a îmbunătăți experiența de utilizare.
Utilizatorul țintă
Aplicația se adresează oricărei persoane care caută rapid un restaurant potrivit pentru nevoile sale, fie localnic, fie turist.
 Utilizatorii pot fi persoane grăbite care doresc să evite timpul pierdut căutând manual opțiuni de restaurante.
 ExpertEat ajută în special prin faptul că furnizează rezultate rapide, vizuale, personalizate și intuitive, incluzând imagini și link-uri utile.
