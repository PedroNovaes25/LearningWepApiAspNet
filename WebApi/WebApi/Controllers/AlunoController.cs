using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")] // habilita os acessos: Origin - (Site); Header ; Methods - (limita o acesso das requisições para a url definida) 
    public class AlunoController : ApiController
    {
        // GET: api/Aluno
        public IEnumerable<Aluno> Get()
        {
            Aluno aluno = new Aluno();
            return aluno.ListarAlunos();
        }

        // GET: api/Aluno/5
        public Aluno Get(int id)
        {
            Aluno aluno = new Aluno();
            return aluno.ListarAlunos().FirstOrDefault(x => x.Id == id);
        }

        // POST: api/Aluno
        public List<Aluno> Post([FromBody] Aluno aluno)
        {
            Aluno _aluno = new Aluno();

            _aluno.Inserir(aluno);

            return _aluno.ListarAlunos();
        }

        // PUT: api/Aluno/5
        public Aluno Put(int id, [FromBody] Aluno aluno)
        {
            Aluno _aluno = new Aluno();
             _aluno = _aluno.Atualizar(id, aluno);
             
            return _aluno;
        }

        // DELETE: api/Aluno/5
        public void Delete(int id)
        {
            Aluno _aluno = new Aluno();
            _aluno.Deletar(id);

        }
    }
}
